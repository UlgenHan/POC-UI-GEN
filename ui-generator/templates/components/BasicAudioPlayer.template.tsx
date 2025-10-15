import React from "react";
import BasicAudioPlayer from "../../../React-UI-Collection/src/components/ui/media/audio/BasicAudioPlayer.tsx";

export default function BasicAudioPlayerTemplate() {
  return <BasicAudioPlayer controls={"true"} autoplay={"false"} muted={"false"} loop={"false"} preload={"metadata"} className={""}>BasicAudioPlayer</BasicAudioPlayer>;
}
