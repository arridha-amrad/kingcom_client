type Props = {
  videoUrl: string | null;
  name: string;
};

export default function Video({ name, videoUrl }: Props) {
  return (
    <div className="py-4">
      <h1 className="font-bold text-center text-2xl pb-8">{name}</h1>
      {videoUrl ? (
        <div className="aspect-video w-full max-w-[800px] mx-auto">
          <iframe
            className="w-full h-full"
            src={videoUrl}
            title="YouTube Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <div>
          <h2>Video not provided</h2>
        </div>
      )}
    </div>
  );
}
