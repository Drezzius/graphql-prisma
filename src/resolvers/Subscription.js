const Subscription = {
  comment: {
    subscribe(parent, { postId }, { db, pubsub }, info) {
      const post = db.posts.find(post => {
        console.log(postId);
        return post.id === postId && post.published;
      });
      if (!post) {
        throw new Error("Post doesn't exist.");
      }

      return pubsub.asyncIterator(`comment: ${postId}`);
    }
  },
  post: {
    subscribe(parent, args, { pubsub }, info) {
      return pubsub.asyncIterator('post');
    }
  }
};

export default Subscription;
