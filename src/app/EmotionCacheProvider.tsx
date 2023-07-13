"use client";

import * as React from "react";
import createCache from "@emotion/cache";
import { useServerInsertedHTML } from "next/navigation";
import { CacheProvider as DefaultCacheProvider } from "@emotion/react";
import type {
  EmotionCache,
  Options as OptionsOfCreateCache,
} from "@emotion/cache";

export type EmotionCacheProviderProps = {
  /** This is the options passed to createCache() from 'import createCache from "@emotion/cache"' */
  options: Omit<OptionsOfCreateCache, "insertionPoint">;
  /** By default <CacheProvider /> from 'import { CacheProvider } from "@emotion/react"' */
  CacheProvider?: (props: {
    value: EmotionCache;
    children: React.ReactNode;
  }) => React.JSX.Element | null;
  children: React.ReactNode;
};

// This implementation is taken from https://github.com/garronej/tss-react/blob/main/src/next/appDir.tsx
export default function EmotionCacheProvider(props: EmotionCacheProviderProps) {
  const { options, CacheProvider = DefaultCacheProvider, children } = props;

  const [{ cache, flush }] = React.useState(() => {
    const cache = createCache(options);
    cache.compat = true;
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const prevInsert = cache.insert;
    let insertedNames: string[] = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        insertedNames.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = insertedNames;
      insertedNames = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }
    const styles = names.map((name) => cache.inserted[name]).join("");
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{
        __html: options.prepend ? `@layer emotion {${styles}}` : styles,
        }}
      />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
