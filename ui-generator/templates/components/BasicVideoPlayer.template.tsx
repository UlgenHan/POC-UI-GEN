import React from "react";
import BasicVideoPlayer from "../../../React-UI-Collection/src/components/ui/media/video/BasicVideoPlayer.tsx";

export default function BasicVideoPlayerTemplate() {
  return <BasicVideoPlayer width={"100%"} height={"auto"} controls={"true"} autoplay={"false"} muted={"false"} loop={"false"} className={""}>BasicVideoPlayer</BasicVideoPlayer>;
}
