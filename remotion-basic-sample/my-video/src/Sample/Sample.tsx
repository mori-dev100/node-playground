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
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        fontSize: 100,
        backgroundColor: "white",
      }}
    >
      The current frame is: {frame}
    </AbsoluteFill>
  );
};
