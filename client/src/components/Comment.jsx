import React, { useEffect } from 'react'

export default function Comment({ comment }) {
    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch(`/api/user/${comment.userId}`);
                const data = await res.json();
                if (res.ok) {
                    console.log(data);
                }
            } catch (error) {
                console.log(error.message);
            }
        }
    }, [comment])

  return (
    <div>Comment</div>
  )
}
