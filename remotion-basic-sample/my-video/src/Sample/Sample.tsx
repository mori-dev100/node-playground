import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { z } from "zod";

export const sampleCompSchema = z.object({
  title: z.string(),
});

export const Sample: React.FC<z.infer<typeof sampleCompSchema>> = ({
  title,
}) => {
  const frame = useCurrentFrame();
  const opacity = Math.min(1, frame / 60);

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
        }}
      >
        Hello world
      </div>
    </AbsoluteFill>
  );
};
