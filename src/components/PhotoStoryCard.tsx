type PhotoStoryCardProps = {
  src?: string;
  alt: string;
  description: string;
  detail: string;
  isActive: boolean;
  /** Extra classes for the image frame (marquee cards set a fixed height, grid cells fill). */
  frameClassName?: string;
  showCaption?: boolean;
};

/** Photo with hover/tap-to-reveal story overlay, shared by WhoIAm and Activity. */
const PhotoStoryCard = ({
  src,
  alt,
  description,
  detail,
  isActive,
  frameClassName = "",
  showCaption = true,
}: PhotoStoryCardProps) => {
  return (
    <>
      <div
        className={`relative w-full rounded-xl overflow-hidden ${frameClassName}`}
      >
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-all duration-300 ${
            isActive ? "scale-105 blur-[2px] brightness-50" : ""
          }`}
        />

        {/* Reveal overlay */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6 overflow-y-auto transition-opacity duration-300 ${
            isActive ? "opacity-100" : "opacity-0"
          }`}
        >
          <h3 className="text-text text-sm sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 text-center shrink-0">
            {description}
          </h3>
          <p className="text-text/80 text-xs sm:text-sm text-center leading-relaxed line-clamp-6 sm:line-clamp-none">
            {detail}
          </p>
        </div>
      </div>

      {showCaption && (
        <p className="text-text/70 text-sm sm:text-base mt-4 text-center px-4">
          {description}
        </p>
      )}
    </>
  );
};

export default PhotoStoryCard;
