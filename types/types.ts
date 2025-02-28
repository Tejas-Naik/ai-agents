export interface ChannelDetails {
  title: string;
  thumbnail: string;
  subscribers: number;
}

//  Complete video details
export interface VideoDetails {
  title: string;
  views: string;
  likes: string;
  comments: string;
  thumbnail: string;
  channel: ChannelDetails;
  publishedAt: string;
}
