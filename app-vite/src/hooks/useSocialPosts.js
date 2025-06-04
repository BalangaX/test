import { useState, useEffect, useCallback } from 'react';
import { db } from '../firebase/config';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  arrayUnion,
  arrayRemove,
  writeBatch,
  getDocs
} from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

const useSocialPosts = () => {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const postsCollection = collection(db, 'social_posts');
    const q = query(postsCollection, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const postsData = [];
      for (const postDoc of querySnapshot.docs) {
        const post = {
          id: postDoc.id,
          ...postDoc.data(),
          createdAt: postDoc.data().createdAt?.toDate ? postDoc.data().createdAt.toDate() : new Date(),
          comments: [] // Initialize comments array
        };

        // Fetch comments for each post
        const commentsCollection = collection(db, `social_posts/${postDoc.id}/comments`);
        const commentsQuery = query(commentsCollection, orderBy('createdAt', 'asc'));
        const commentsSnapshot = await getDocs(commentsQuery);
        post.comments = commentsSnapshot.docs.map(commentDoc => ({
          id: commentDoc.id,
          ...commentDoc.data(),
          createdAt: commentDoc.data().createdAt?.toDate ? commentDoc.data().createdAt.toDate() : new Date(),
        }));
        postsData.push(post);
      }
      setPosts(postsData);
      setLoading(false);
    }, (err) => {
      console.error("Error fetching social posts:", err);
      setError(err.message);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addPost = useCallback(async ({ title, content }) => {
    if (!currentUser) throw new Error("User not authenticated for posting.");
    try {
      await addDoc(collection(db, 'social_posts'), {
        title,
        content,
        authorId: currentUser.uid,
        authorEmail: currentUser.email, // For display convenience
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        likes: [], // Initialize likes array
        likeCount: 0 // Optional: denormalized count
      });
    } catch (err) {
      console.error("Error adding post:", err);
      throw err;
    }
  }, [currentUser]);

  const addComment = useCallback(async (postId, commentText) => {
    if (!currentUser) throw new Error("User not authenticated for commenting.");
    if (!postId || !commentText.trim()) throw new Error("Post ID and comment text are required.");
    try {
      const commentsCollection = collection(db, `social_posts/${postId}/comments`);
      await addDoc(commentsCollection, {
        text: commentText,
        authorId: currentUser.uid,
        authorEmail: currentUser.email,
        createdAt: serverTimestamp(),
        likes: [],
        likeCount: 0
      });
      // Optionally update comment count on post document if denormalizing
    } catch (err) {
      console.error("Error adding comment:", err);
      throw err;
    }
  }, [currentUser]);

  const toggleLike = useCallback(async (docPath, docId, currentLikes = []) => {
    if (!currentUser) throw new Error("User not authenticated for liking.");

    const docRef = doc(db, docPath, docId);

    try {
      const userHasLiked = currentLikes.includes(currentUser.uid);
      await updateDoc(docRef, {
        likes: userHasLiked ? arrayRemove(currentUser.uid) : arrayUnion(currentUser.uid),
        // likeCount: userHasLiked ? increment(-1) : increment(1) // If using denormalized count
      });
    } catch (err) {
      console.error("Error toggling like:", err);
      throw err;
    }
  }, [currentUser]);


  return { posts, loading, error, addPost, addComment, toggleLike, setPosts };
};

export default useSocialPosts;
