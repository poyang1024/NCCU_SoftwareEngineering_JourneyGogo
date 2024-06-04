import axios from 'axios'
import { Attraction } from '../models/attraction'

const API_URL = import.meta.env.VITE_BACKEND_API_URL

class AttractionService {
  async getAttraction(city?: string, keyword?: string): Promise<Array<Attraction>> {
    let url = API_URL + 'attractions/';
    const params = new URLSearchParams();

    if (city) {
      params.append('city', city);
    }
    if (keyword) {
      params.append('keyword', keyword);
    }

    const response = await axios.get(url, { params });
    console.log(response)
    const attractions = response.data.map((item: any) => ({
      ...item.attraction,
      favorite: item.favorite,
      comments: item.comments.map((comment: any) => comment.content)
    }));

    return attractions;
  }

  async getAttractionById(id: number): Promise<{ attraction: Attraction; favorite: number; comments: Array<string> }> {
    const response = await axios.get(`${API_URL}attractions/${id}`);
    const { attraction, favorite, comments } = response.data;
    return {
      attraction: { ...attraction, comments: comments.map((comment: any) => comment.content) },
      favorite,
      comments: comments.map((comment: any) => comment.content),
    };
  }

  // async updateProfile(profile: User): Promise<User> {
  //   const response = await axios.patch(API_URL + 'users/me', profile)
  //   return response.data
  // }

  // async updateUser(userId: string, profile: User): Promise<User> {
  //   const response = await axios.patch(API_URL + `users/${userId}`, profile)
  //   return response.data
  // }

  // async getUsers(): Promise<Array<User>> {
  //   const response = await axios.get(API_URL + 'users')
  //   return response.data
  // }

  // async deleteUser(userId: string) {
  //   const response = await axios.delete(API_URL + `users/${userId}`)
  //   return response.data
  // }

  // async deleteSelf() {
  //   const response = await axios.delete(API_URL + 'users/me')
  //   return response.data
  // }
}

export default new AttractionService()