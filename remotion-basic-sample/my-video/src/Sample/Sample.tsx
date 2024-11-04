import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";

export const sampleCompSchema = z.object({
  title: z.string(),
});

export const Sample: React.FC<z.infer<typeof sampleCompSchema>> = ({
  title,
}) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 60], [0, 1], {
    extrapolateLeft: "wrap",
  });
  const scale = spring({
    fps,
    frame,
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        fontSize: 100,
        backgroundColor: "white",
      }}
    >
      <div
        style={{
          opacity: opacity,
          transform: `scale(${scale})`,
        }}
      >
        Hello world
      </div>
    </AbsoluteFill>
  );
};
