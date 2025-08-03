import { PostModel } from "../models/Formschema";

export class postService {
  //create a post
  async createPost(data: any) {
    try {
      const dataWithId = { ...data, formID: Math.random() };
      await PostModel.create(dataWithId);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  //get all posts
  async getPosts() {
    try {
      const posts = await PostModel.find({});
      return posts;
    } catch (error) {
      console.log(error);
    }
  }

  //get a single post
  async getPost(id: string) {
    try {
      const post = await PostModel.findOne({ formID: id });
      if (!post) {
        return "post not available";
      }
      return post;
    } catch (error) {
      console.log(error);
    }
  }

  //update a post
  async updatePost(id: string, data: any) {
    try {
      const postz = await PostModel.findByIdAndUpdate({ formID: id }, data, {
        new: true,
      });
      if (!postz) {
        return "post not available";
      }
      return postz;
    } catch (error) {
      console.log(error);
    }
  }

  async deletePost(id: string) {
    try {
      const post = await PostModel.findByIdAndDelete(id);
      if (!post) {
        return "post not available";
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const postServices = new postService();
