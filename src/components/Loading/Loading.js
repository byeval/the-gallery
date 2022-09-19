import React, { useState, useEffect } from 'react';
import * as THREE from 'three';
import { useTransition, a } from 'react-spring';

const Loading = () => {
  const [finished, set] = useState(false);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    THREE.DefaultLoadingManager.onLoad = () => {
      console.log('loaded');
      set(true);
    };
    THREE.DefaultLoadingManager.onProgress = (_, itemsLoaded, itemsTotal) => {
      console.log(itemsLoaded, itemsTotal);
      setWidth((itemsLoaded / itemsTotal) * 200);
    };
  }, []);

  const transitions = useTransition(finished, {
    from: { opacity: 1, width: 0 },
    leave: { opacity: 0 },
    update: { width },
  });

  return transitions(
    ({ opacity, width }, item) =>
      !item && (
        <a.div className="loading" key={item.key} style={{ opacity }}>
          <h1 className="welcome">The Gallery</h1>
          <div className="loading-bar-container">
            <a.div className="loading-bar" style={{ width }} />
          </div>
        </a.div>
      )
  );
};

export default Loading;
