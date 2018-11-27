import { FblComment } from '@/interface/fbl-comment';
import Axios from 'axios';
import { FblPhoto } from '@/interface/fbl-photo';

export class CommentService {
  getCommentsForPost(id: number): Promise<FblComment[]> {
    return Axios.get<FblComment[]>(`https://jsonplaceholder.typicode.com/comments?postId=${id}`).then(response => response.data);
  }

  getCommentsAuthorPhotoForPost(id: number): Promise<string> {
    return Axios.get<FblPhoto[]>(`https://jsonplaceholder.typicode.com/photos?id=${id}`).then(response => response.data[0].thumbnailUrl);
  }
}