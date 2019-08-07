import {
  createUser,
  loginUser,
  deleteUser,
  updateUser
} from './mutations/users';
import { createPost, deletePost, updatePost } from './mutations/posts';
import {
  createComment,
  deleteComment,
  updateComment
} from './mutations/comments';

const Mutation = {
  createUser,
  deleteUser,
  updateUser,
  loginUser,

  createPost,
  deletePost,
  updatePost,

  createComment,
  deleteComment,
  updateComment
};

export default Mutation;
