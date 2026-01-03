"use client";

export default function ImageScroller() {
  const bgImage = "https://cdn.prod.website-files.com/66a08e07fa6352714fc1d6da/6736e80da500fd87dee2bc0c_66fb0942d82cd3538fe62688_66a0ab0a5139b022619ddc3d_DEDICATED%25252BAREA%25252BINDORE.jpeg";
  const overlay = "rgba(21,22,28,0.15)";
  const video = "https://www.yudiz.com/codepen/studio-r/bg-video.mp4";

  return (
    <div className="bg-white text-white overflow-x-hidden lg:h-[80vh] h-[50vh] relative isolate mb-10">
      {/* BACKGROUND IMAGE CONTAINER (WITH SPACING) */}
      <div className="absolute left-6 md:left-10 right-6 md:right-10 top-0 h-full z-0">
        <div className="absolute inset-0 overflow-hidden rounded-[12px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
          <div
            className="absolute inset-0"
            style={{ backgroundColor: overlay }}
          />
        </div>
      </div>

      {/* TEXT CONTAINER (LEFT SIDE) */}
      {/* <div className="absolute left-6 md:left-20 top-1/2 -translate-y-1/2 z-[2] w-[calc(100%-80px)] md:w-[45%] lg:w-[40%] xl:w-[35%]">
        <h2 className="mb-4 md:mb-6 text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wide drop-shadow-[2px_2px_4px_rgba(0,0,0,0.5)]">
          Modern Coworking Spaces
        </h2>
        <p className="text-base md:text-lg lg:text-xl leading-relaxed drop-shadow-[1px_1px_2px_rgba(0,0,0,0.5)]">
          Experience flexible, collaborative workspaces designed for productivity and innovation. Join a community of entrepreneurs, freelancers, and businesses in our state-of-the-art facilities.
        </p>
      </div> */}

      {/* VIDEO CONTAINER (RIGHT SIDE) */}
      <div
        className="absolute overflow-hidden shadow-[0_0_10px_10px_rgba(0,0,0,0.12)] z-[2] rounded-[12px]
          top-1/2 -translate-y-1/2 right-6 md:right-28
          w-[180px] h-[180px]
          md:w-[250px] md:h-[250px]
          lg:w-[320px] lg:h-[320px]
          xl:w-[360px] xl:h-[360px]
          2xl:w-[400px] 2xl:h-[400px]
        "
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center"
        >
          <source src={video} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
