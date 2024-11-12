import { useEffect, useRef } from "react";

interface UseInfiniteScrollOptions {
  onIntersect: () => void;
  rootMargin?: string;
  threshold?: number;
  isLoading: boolean;
}

const useInfiniteScroll = ({
  onIntersect,
  rootMargin = "100px",
  threshold = 1.0,
  isLoading,
}: UseInfiniteScrollOptions) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          onIntersect();
        }
      },
      {
        root: null,
        rootMargin,
        threshold,
      }
    );

    const currentRef = observerRef.current;
    observer.observe(currentRef);

    return () => {
      observer.unobserve(currentRef);
    };
  }, [onIntersect, rootMargin, threshold, isLoading]);

  return observerRef;
};

export default useInfiniteScroll;
