import React from "react";
import WaveformAudioPlayer from "../../../React-UI-Collection/src/components/ui/media/audio/WaveformAudioPlayer.tsx";

export default function WaveformAudioPlayerTemplate() {
  return <WaveformAudioPlayer autoplay={"false"} loop={"false"} waveformColor={"bg-gray-300"} progressColor={"bg-blue-500"} className={""}>WaveformAudioPlayer</WaveformAudioPlayer>;
}
