import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    videoId: { type: String, required: true, trim: true, unique: true },
    channelId: { type: String, required: true, trim: true},
    title: String, 
    channelTitle: String, 
    publishedAt:Date,
    country: String,
    viewCount: Number,
    likeCount: Number,
    dislikeCount: Number,
    favoriteCount: Number,
    commentCount:Number
   
  }
);

const Video = mongoose.model("Video", videoSchema);

export default Video;


// {
//     "kind":"youtube#video",
//     "etag":"qTQ3XvBnkkMjGwbVoVjmV4zHQao",
//     "id":"_0p9Scr5zdQ",
//     "snippet":{
//        "publishedAt":"2021-06-02T00:49:19Z",
//        "channelId":"UCKMCgBiGGPrEnLRJ0ij-N8Q",
//        "title":"遇到bug 了( ･᷄ὢ･᷅ ) 沒關係我照樣玩:D",
//        "description":"",
//        "thumbnails":{
//           "default":{
//              "url":"https://i.ytimg.com/vi/_0p9Scr5zdQ/default.jpg",
//              "width":120,
//              "height":90
//           },
//           "medium":{
//              "url":"https://i.ytimg.com/vi/_0p9Scr5zdQ/mqdefault.jpg",
//              "width":320,
//              "height":180
//           },
//           "high":{
//              "url":"https://i.ytimg.com/vi/_0p9Scr5zdQ/hqdefault.jpg",
//              "width":480,
//              "height":360
//           },
//           "standard":{
//              "url":"https://i.ytimg.com/vi/_0p9Scr5zdQ/sddefault.jpg",
//              "width":640,
//              "height":480
//           },
//           "maxres":{
//              "url":"https://i.ytimg.com/vi/_0p9Scr5zdQ/maxresdefault.jpg",
//              "width":1280,
//              "height":720
//           }
//        },
//        "channelTitle":"蝴蝶夢",
//        "categoryId":"22",
//        "liveBroadcastContent":"none",
//        "localized":{
//           "title":"遇到bug 了( ･᷄ὢ･᷅ ) 沒關係我照樣玩:D",
//           "description":""
//        }
//     },
//     "statistics":{
//        "viewCount":"33",
//        "likeCount":"3",
//        "dislikeCount":"1",
//        "favoriteCount":"0",
//        "commentCount":"23"
//     }
//  }