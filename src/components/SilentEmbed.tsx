import React, { useEffect, useRef } from "react";

type IframeProps = React.ComponentPropsWithoutRef<"iframe">;
type VideoProps  = React.ComponentPropsWithoutRef<"video">;
type AudioProps  = React.ComponentPropsWithoutRef<"audio">;

type SilentProps =
  | ({ kind: "video" }  & Pick<VideoProps, "src" | "poster" | "loop" | "playsInline" | "controls" | "className" | "style">)
  | ({ kind: "audio" }  & Pick<AudioProps, "src" | "loop" | "controls" | "className" | "style">)
  | ({ kind: "youtube"; videoId: string; autoplay?: boolean } & Pick<IframeProps, "className" | "style" | "title">)
  | ({ kind: "vimeo";   videoId: string; autoplay?: boolean } & Pick<IframeProps, "className" | "style" | "title">)
  | ({ kind: "iframe" } & Pick<IframeProps, "src" | "title" | "referrerPolicy" | "className" | "style">);

/** helper to add query params safely */
const withParams = (base: string, params: Record<string, string | number | boolean>) => {
  const url = new URL(base, typeof window === "undefined" ? "https://example.com" : window.location.origin);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));
  return url.pathname + "?" + url.searchParams.toString();
};

export function SilentEmbed(props: SilentProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (props.kind === "video" && videoRef.current) {
      videoRef.current.muted = true;
      try { videoRef.current.volume = 0; } catch {}
    }
  }, [props.kind]);

  useEffect(() => {
    if (props.kind === "audio" && audioRef.current) {
      audioRef.current.muted = true;
      try { audioRef.current.volume = 0; } catch {}
    }
  }, [props.kind]);

  if (props.kind === "video") {
    const { kind, ...rest } = props;
    return <video {...rest} ref={videoRef} muted autoPlay playsInline />;
  }

  if (props.kind === "audio") {
    const { kind, ...rest } = props;
    return <audio {...rest} ref={audioRef} muted autoPlay />;
  }

  if (props.kind === "youtube") {
    const { videoId, autoplay, ...rest } = props;
    const src = withParams(`https://www.youtube.com/embed/${videoId}`, {
      mute: 1,
      autoplay: autoplay ? 1 : 0,
      modestbranding: 1,
      rel: 0,
      playsinline: 1,
    });
    return (
      <iframe
        {...rest}
        src={src}
        allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  if (props.kind === "vimeo") {
    const { videoId, autoplay, ...rest } = props;
    const src = withParams(`https://player.vimeo.com/video/${videoId}`, {
      muted: 1,
      autoplay: autoplay ? 1 : 0,
      background: 0,
      playsinline: 1,
    });
    return (
      <iframe
        {...rest}
        src={src}
        allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  // generic iframe: you cannot force mute cross-origin.
  // We *block autoplay* via permission policy so it won’t start blasting.
  if (props.kind === "iframe") {
    const { kind, ...rest } = props;
    return (
      <iframe
        {...rest}
        // Block autoplay entirely inside the frame. (Stricter than just omitting it.)
        // Works in modern Chromium/Firefox: prevents auto-start audio.
        allow="fullscreen; picture-in-picture; autoplay 'none'"
      />
    );
  }

  return null;
}


// utils/SilentEmbed.tsx (keep from earlier, trimmed)
export function SilentEmbedIframe(p: React.ComponentPropsWithoutRef<'iframe'>) {
    const { ...rest } = p;
    return (
      <iframe
        {...rest}
        // prevent any auto-starting audio/video
        allow="fullscreen; picture-in-picture; autoplay 'none'"
        // optional extra hardening:
        // sandbox="allow-scripts allow-pointer-lock allow-same-origin"
        style={{ border: 'none', display: 'block', width: '100%', height: '100%' }}
      />
    );
  }