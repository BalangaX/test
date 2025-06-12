import React, { useState, useEffect, useRef } from "react";
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase/config";
import styles from "./GroupChat.module.css";

export default function GroupChat({ groupId, currentUser }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef();

  useEffect(() => {
    if (!groupId) return;

    const messagesRef = collection(db, "studyGroups", groupId, "messages");
    const q = query(messagesRef, orderBy("sentAt", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(msgs);
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    });

    return () => unsubscribe();
  }, [groupId]);

  const handleSend = async () => {
    if (!newMessage.trim() || !currentUser) return;
    setSending(true);
    try {
      const messagesRef = collection(db, "studyGroups", groupId, "messages");
      const username = currentUser.username;
      await addDoc(messagesRef, {
        text: newMessage.trim(),
        authorUid: currentUser.uid,
        authorUsername: username,
        sentAt: serverTimestamp(),
      });
      setNewMessage("");
    } catch (err) {
    } finally {
      setSending(false);
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messages} ref={scrollRef}>
        {messages.length === 0 ? (
          <p className={styles.noMessages}>No messages yet.</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`${styles.message} ${
                msg.authorUid === currentUser?.uid
                  ? styles.ownMessage
                  : styles.otherMessage
              }`}
            >
              <span className={styles.author}>
                {msg.authorUid === currentUser?.uid ? "You" : msg.authorUsername}
              </span>
              <p className={styles.text}>{msg.text}</p>
            </div>
          ))
        )}
      </div>

      {currentUser ? (
        <div className={styles.inputContainer}>
          <textarea
            className={styles.input}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button
            className={styles.sendBtn}
            onClick={handleSend}
            disabled={sending}
          >
            {sending ? "Sending..." : "Send"}
          </button>
        </div>
      ) : (
        <p>Please log in to send messages.</p>
      )}
    </div>
  );
}