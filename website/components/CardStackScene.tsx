'use client';

import { useEffect, useRef } from 'react';
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Shape,
  ShapeGeometry,
  Float32BufferAttribute,
  Mesh,
  MeshStandardMaterial,
  MeshBasicMaterial,
  CanvasTexture,
  Group,
  Color,
  AmbientLight,
  DirectionalLight,
  SRGBColorSpace,
  ACESFilmicToneMapping,
  PlaneGeometry,
} from 'three';

interface CardData {
  title: string;
  tag: string;
  glowHex: string;
  imageSrc: string;
  desc: string;
}

const CARDS: CardData[] = [
  {
    title: 'TROJENA MOUNTAIN',
    tag: 'High ROI',
    glowHex: '#8a8fd8',
    imageSrc: '/images/trojena.jpg',
    desc: 'Year-round mountain destination offering outdoor skiing and ultra-luxury hospitality.',
  },
  {
    title: 'THE LINE',
    tag: 'Invest in NEOM',
    glowHex: '#e8b45a',
    imageSrc: '/images/the-line.jpg',
    desc: 'Linear smart city powered 100% by renewable energy with zero cars and zero emissions.',
  },
  {
    title: 'MAGNA COASTAL',
    tag: 'Invest in Future',
    glowHex: '#a9b07a',
    imageSrc: '/images/magna.jpg',
    desc: 'Exclusive coastal retreat blending pristine nature with world-class wellness.',
  },
  {
    title: 'SINDALAH ISLAND',
    tag: 'Luxury',
    glowHex: '#5fb7c9',
    imageSrc: '/images/sindalah.jpg',
    desc: 'Premier luxury yachting and island sanctuary on the Red Sea backwaters.',
  },
];

// Helper: Cubic ease in-out
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Helper: Linear interpolation
function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

// Rounded-rectangle shape generator
function createRoundedRectShape(
  width: number,
  height: number,
  radius: number
): Shape {
  const shape = new Shape();
  const x = -width / 2;
  const y = -height / 2;

  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);

  return shape;
}

// Rounded-rect path on 2D Canvas
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

interface CardStackSceneProps {
  className?: string;
}

export default function CardStackScene({ className = '' }: CardStackSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Safety checks for container dimensions
    let width = container.clientWidth || 800;
    let height = container.clientHeight || 600;

    // --- 1. Scene, Camera, Renderer ---
    const scene = new Scene();
    scene.background = new Color(0xf6f6f4);

    const camera = new PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.6);

    const renderer = new WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = SRGBColorSpace;
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    // React Strict Mode safety: clean any previous child canvas
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // --- 2. Lights ---
    const ambientLight = new AmbientLight(0xffffff, 1.3);
    scene.add(ambientLight);

    const dirLight = new DirectionalLight(0xffffff, 1.8);
    dirLight.position.set(5, 8, 6);
    scene.add(dirLight);

    const backFillLight = new DirectionalLight(0xffffff, 0.6);
    backFillLight.position.set(-5, -4, -2);
    scene.add(backFillLight);

    // --- 3. Soft Radial Glow Mesh in Background ---
    const glowCanvas = document.createElement('canvas');
    glowCanvas.width = 512;
    glowCanvas.height = 512;
    const glowCtx = glowCanvas.getContext('2d')!;
    const radialGrad = glowCtx.createRadialGradient(256, 256, 10, 256, 256, 250);
    radialGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    radialGrad.addColorStop(0.35, 'rgba(255, 255, 255, 0.65)');
    radialGrad.addColorStop(0.7, 'rgba(255, 255, 255, 0.2)');
    radialGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    glowCtx.fillStyle = radialGrad;
    glowCtx.fillRect(0, 0, 512, 512);

    const glowTexture = new CanvasTexture(glowCanvas);
    glowTexture.colorSpace = SRGBColorSpace;

    const glowColor = new Color(CARDS[0].glowHex);
    const glowMaterial = new MeshBasicMaterial({
      map: glowTexture,
      color: glowColor,
      transparent: true,
      opacity: 0.58,
      depthWrite: false,
    });
    const glowGeometry = new PlaneGeometry(13, 13);
    const glowMesh = new Mesh(glowGeometry, glowMaterial);
    glowMesh.position.set(0, 0.2, -1.5);
    scene.add(glowMesh);

    // --- 4. Card Geometry with Rounded Corners (Aspect ratio ~3:4) ---
    const cardWidth = 2.65;
    const cardHeight = 3.53;
    const cardRadius = 0.2;
    const cardShape = createRoundedRectShape(cardWidth, cardHeight, cardRadius);
    const cardGeometry = new ShapeGeometry(cardShape, 32);

    // Compute exact [0, 1] UVs for ShapeGeometry
    const posAttr = cardGeometry.attributes.position;
    const uvs: number[] = [];
    for (let i = 0; i < posAttr.count; i++) {
      const px = posAttr.getX(i);
      const py = posAttr.getY(i);
      uvs.push((px + cardWidth / 2) / cardWidth, (py + cardHeight / 2) / cardHeight);
    }
    cardGeometry.setAttribute('uv', new Float32BufferAttribute(uvs, 2));

    // --- 5. Generate Card Canvas Textures ---
    const canvasTextures: CanvasTexture[] = [];
    const cardCanvases: HTMLCanvasElement[] = [];

    const drawCardCanvas = (
      canvas: HTMLCanvasElement,
      card: CardData,
      loadedImg: HTMLImageElement | null
    ) => {
      const cw = 768;
      const ch = 1024;
      canvas.width = cw;
      canvas.height = ch;
      const ctx = canvas.getContext('2d')!;

      // A. Dark glassy card body
      roundRect(ctx, 4, 4, cw - 8, ch - 8, 48);
      const bgGrad = ctx.createLinearGradient(0, 0, 0, ch);
      bgGrad.addColorStop(0, '#1c202a');
      bgGrad.addColorStop(0.5, '#13161d');
      bgGrad.addColorStop(1, '#0c0e12');
      ctx.fillStyle = bgGrad;
      ctx.fill();

      // Glass specular border
      ctx.lineWidth = 3;
      const borderGrad = ctx.createLinearGradient(0, 0, 0, ch);
      borderGrad.addColorStop(0, 'rgba(255, 255, 255, 0.28)');
      borderGrad.addColorStop(0.4, 'rgba(255, 255, 255, 0.12)');
      borderGrad.addColorStop(1, 'rgba(255, 255, 255, 0.05)');
      ctx.strokeStyle = borderGrad;
      ctx.stroke();

      // Top edge frosted highlight
      ctx.save();
      ctx.beginPath();
      roundRect(ctx, 4, 4, cw - 8, ch - 8, 48);
      ctx.clip();
      const topShine = ctx.createLinearGradient(0, 0, 0, 80);
      topShine.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
      topShine.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = topShine;
      ctx.fillRect(0, 0, cw, 80);
      ctx.restore();

      // B. Top Bar: Icon (top-left) & Circular Arrow Button (top-right)
      // Icon: Modern geometric diamond
      ctx.save();
      ctx.translate(46, 50);
      ctx.beginPath();
      ctx.moveTo(14, 0);
      ctx.lineTo(28, 14);
      ctx.lineTo(14, 28);
      ctx.lineTo(0, 14);
      ctx.closePath();
      ctx.fillStyle = card.glowHex;
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Inner diamond
      ctx.beginPath();
      ctx.moveTo(14, 6);
      ctx.lineTo(22, 14);
      ctx.lineTo(14, 22);
      ctx.lineTo(6, 14);
      ctx.closePath();
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.restore();

      // Small subtitle next to icon
      ctx.font = 'bold 13px Inter, -apple-system, sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
      ctx.letterSpacing = '2px';
      ctx.fillText('NEOM ASSETS', 90, 68);

      // Circular Arrow Button (top-right)
      const btnX = cw - 58;
      const btnY = 64;
      const btnR = 24;
      ctx.beginPath();
      ctx.arc(btnX, btnY, btnR, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Arrow ↗ symbol
      ctx.save();
      ctx.translate(btnX, btnY);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(-6, 6);
      ctx.lineTo(6, -6);
      ctx.moveTo(0, -6);
      ctx.lineTo(6, -6);
      ctx.lineTo(6, 0);
      ctx.stroke();
      ctx.restore();

      // C. Rounded-Corner Image Area
      const imgX = 40;
      const imgY = 112;
      const imgW = cw - 80;
      const imgH = 490;
      const imgR = 32;

      ctx.save();
      roundRect(ctx, imgX, imgY, imgW, imgH, imgR);
      ctx.clip();

      if (loadedImg && loadedImg.complete && loadedImg.naturalWidth > 0) {
        // Draw real loaded image with cover aspect ratio
        const imgAspect = loadedImg.naturalWidth / loadedImg.naturalHeight;
        const targetAspect = imgW / imgH;
        let sx = 0,
          sy = 0,
          sw = loadedImg.naturalWidth,
          sh = loadedImg.naturalHeight;

        if (imgAspect > targetAspect) {
          sw = loadedImg.naturalHeight * targetAspect;
          sx = (loadedImg.naturalWidth - sw) / 2;
        } else {
          sh = loadedImg.naturalWidth / targetAspect;
          sy = (loadedImg.naturalHeight - sh) / 2;
        }
        ctx.drawImage(loadedImg, sx, sy, sw, sh, imgX, imgY, imgW, imgH);
      } else {
        // Fallback gradient placeholder
        const placeholderGrad = ctx.createLinearGradient(imgX, imgY, imgX + imgW, imgY + imgH);
        placeholderGrad.addColorStop(0, card.glowHex);
        placeholderGrad.addColorStop(0.5, '#1e2330');
        placeholderGrad.addColorStop(1, '#0e1015');
        ctx.fillStyle = placeholderGrad;
        ctx.fillRect(imgX, imgY, imgW, imgH);

        // Abstract subtle lines on placeholder
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 2;
        for (let i = 0; i < 6; i++) {
          ctx.beginPath();
          ctx.arc(imgX + imgW / 2, imgY + imgH + 50, 100 + i * 50, Math.PI, 0);
          ctx.stroke();
        }
      }

      // Vignette / dark overlay at bottom of image for tag legibility
      const imgVignette = ctx.createLinearGradient(0, imgY + imgH - 120, 0, imgY + imgH);
      imgVignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
      imgVignette.addColorStop(1, 'rgba(0, 0, 0, 0.65)');
      ctx.fillStyle = imgVignette;
      ctx.fillRect(imgX, imgY + imgH - 120, imgW, 120);

      // Glass border on image
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 2;
      roundRect(ctx, imgX, imgY, imgW, imgH, imgR);
      ctx.stroke();

      ctx.restore();

      // D. Pill Tag (Over bottom-left of image)
      const tagText = card.tag;
      ctx.font = 'bold 15px Inter, -apple-system, sans-serif';
      const tagMetrics = ctx.measureText(tagText);
      const tagPadX = 18;
      const tagW = tagMetrics.width + tagPadX * 2 + 14;
      const tagH = 34;
      const tagX = imgX + 20;
      const tagY = imgY + imgH - tagH - 20;

      ctx.save();
      roundRect(ctx, tagX, tagY, tagW, tagH, 17);
      ctx.fillStyle = 'rgba(12, 14, 18, 0.82)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Glow dot inside pill
      ctx.beginPath();
      ctx.arc(tagX + 16, tagY + tagH / 2, 4, 0, Math.PI * 2);
      ctx.fillStyle = card.glowHex;
      ctx.fill();

      // Pill label
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(tagText, tagX + 28, tagY + tagH / 2 + 0.5);
      ctx.restore();

      // E. Centered Uppercase Title
      ctx.save();
      ctx.textAlign = 'center';
      ctx.font = 'bold 30px Inter, -apple-system, sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.letterSpacing = '1.5px';
      ctx.fillText(card.title, cw / 2, 665);

      // Decorative mini divider
      ctx.beginPath();
      ctx.moveTo(cw / 2 - 28, 690);
      ctx.lineTo(cw / 2 + 28, 690);
      ctx.strokeStyle = card.glowHex;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // F. Short Description (Centered word-wrapped)
      ctx.font = '17px Inter, -apple-system, sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.72)';
      ctx.letterSpacing = '0px';

      const words = card.desc.split(' ');
      const maxDescWidth = cw - 120;
      let line = '';
      let lineY = 730;
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxDescWidth && n > 0) {
          ctx.fillText(line.trim(), cw / 2, lineY);
          line = words[n] + ' ';
          lineY += 26;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line.trim(), cw / 2, lineY);

      // G. Subtle Bottom Spec / Indicator
      ctx.font = '600 12px Inter, -apple-system, sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.letterSpacing = '2px';
      ctx.fillText('EXPLORE PROPERTY  •  NEOM 2026', cw / 2, ch - 50);

      ctx.restore();
    };

    // Create 4 canvas textures and initiate safe image loading
    CARDS.forEach((card, i) => {
      const c = document.createElement('canvas');
      cardCanvases.push(c);

      // Immediate draw with gradient fallback
      drawCardCanvas(c, card, null);

      const tex = new CanvasTexture(c);
      tex.colorSpace = SRGBColorSpace;
      canvasTextures.push(tex);

      // Async image loading from /public/images/
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = card.imageSrc;
      img.onload = () => {
        drawCardCanvas(c, card, img);
        tex.needsUpdate = true;
      };
      img.onerror = () => {
        // Redraw fallback gradient placeholder if image is missing
        drawCardCanvas(c, card, null);
        tex.needsUpdate = true;
      };
    });

    // --- 6. The Card Stack Meshes & Group ---
    const cardsGroup = new Group();
    scene.add(cardsGroup);

    const cardMeshes: Mesh[] = [];
    const cardMaterials: MeshStandardMaterial[] = [];

    CARDS.forEach((_, i) => {
      const mat = new MeshStandardMaterial({
        map: canvasTextures[i],
        roughness: 0.18,
        metalness: 0.08,
        transparent: true,
        opacity: 1.0,
        depthWrite: false,
      });
      cardMaterials.push(mat);

      const mesh = new Mesh(cardGeometry, mat);
      cardMeshes.push(mesh);
      cardsGroup.add(mesh);
    });

    // --- 7. Mirror Reflection of the Current Card Below Stack ---
    // Alpha map for vertical fade-out into the #f6f6f4 floor
    const alphaCanvas = document.createElement('canvas');
    alphaCanvas.width = 128;
    alphaCanvas.height = 256;
    const aCtx = alphaCanvas.getContext('2d')!;
    const fadeGrad = aCtx.createLinearGradient(0, 0, 0, 256);
    fadeGrad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
    fadeGrad.addColorStop(0.35, 'rgba(255, 255, 255, 0.4)');
    fadeGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    aCtx.fillStyle = fadeGrad;
    aCtx.fillRect(0, 0, 128, 256);

    const alphaTexture = new CanvasTexture(alphaCanvas);
    alphaTexture.colorSpace = SRGBColorSpace;

    const reflectionMaterial = new MeshBasicMaterial({
      map: canvasTextures[0],
      alphaMap: alphaTexture,
      transparent: true,
      opacity: 0.22,
      depthWrite: false,
    });

    const reflectionMesh = new Mesh(cardGeometry, reflectionMaterial);
    // Invert vertically and place beneath cards
    reflectionMesh.scale.y = -1;
    reflectionMesh.position.set(0, -3.1, -0.05);
    cardsGroup.add(reflectionMesh);

    // --- 8. Mouse Parallax Listeners ---
    let mouseX = 0;
    let mouseY = 0;
    let targetParallaxX = 0;
    let targetParallaxY = 0;
    let currentParallaxX = 0;
    let currentParallaxY = 0;

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      mouseX = Math.max(-1, Math.min(1, nx));
      mouseY = Math.max(-1, Math.min(1, ny));
    };

    const onPointerLeave = () => {
      mouseX = 0;
      mouseY = 0;
    };

    container.addEventListener('pointermove', onPointerMove, { passive: true });
    container.addEventListener('pointerleave', onPointerLeave, { passive: true });

    // --- 9. ResizeObserver for Container ---
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    // --- 10. Stack Coordinates Definition ---
    // Slot 0: Front active card
    // Slot 1: Behind card 1 (tilted 9-10 deg on Z, offset left and up, darker & semi-transparent)
    // Slot 2: Behind card 2 (tilted 11-12 deg on Z, offset further left and up)
    // Slot 3: Queue card waiting in background
    const SLOT_CONFIGS = [
      { x: 0, y: 0, z: 0, rotZ: 0, scale: 1.0, opacity: 1.0, renderOrder: 40 },
      {
        x: -0.42,
        y: 0.3,
        z: -0.25,
        rotZ: (10 * Math.PI) / 180,
        scale: 0.94,
        opacity: 0.65,
        renderOrder: 30,
      },
      {
        x: -0.8,
        y: 0.58,
        z: -0.5,
        rotZ: (12 * Math.PI) / 180,
        scale: 0.88,
        opacity: 0.38,
        renderOrder: 20,
      },
      {
        x: -1.15,
        y: 0.85,
        z: -0.75,
        rotZ: (14 * Math.PI) / 180,
        scale: 0.82,
        opacity: 0.0,
        renderOrder: 10,
      },
    ];

    // Exiting front card target
    const EXIT_CONFIG = {
      x: -2.3,
      y: 1.45,
      z: 0.1,
      rotZ: (10 * Math.PI) / 180,
      scale: 0.92,
      opacity: 0.0,
      renderOrder: 50,
    };

    // Timing constants
    const HOLD_TIME = 1.6; // 1.6s card hold
    const TRANS_TIME = 0.6; // 0.6s easeInOutCubic transition
    const STEP_TIME = HOLD_TIME + TRANS_TIME; // 2.2s per card
    const TOTAL_LOOP_TIME = 4 * STEP_TIME; // 8.8s seamless total loop

    const cCurrentGlow = new Color();
    const cNextGlow = new Color();

    let animationFrameId: number;
    const startTime = performance.now();

    // --- 11. Animation Loop ---
    const animate = (now: number) => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsed = (now - startTime) / 1000;
      const cycleTime = elapsed % TOTAL_LOOP_TIME;
      const activeIdx = Math.floor(cycleTime / STEP_TIME);
      const timeInStep = cycleTime % STEP_TIME;

      const nextIdx = (activeIdx + 1) % 4;

      // A. Idle float (~4px = ~0.035 units) & Mouse Parallax (max 3 degrees)
      const idleFloat = Math.sin(elapsed * 1.7) * 0.035;
      targetParallaxY = mouseX * ((3 * Math.PI) / 180);
      targetParallaxX = -mouseY * ((3 * Math.PI) / 180);
      currentParallaxX = lerp(currentParallaxX, targetParallaxX, 0.07);
      currentParallaxY = lerp(currentParallaxY, targetParallaxY, 0.07);

      cardsGroup.position.y = idleFloat;
      cardsGroup.rotation.y = currentParallaxY;
      cardsGroup.rotation.x = currentParallaxX;

      // B. Card Stacking Positions & Seamless Loop Transitions
      if (timeInStep < HOLD_TIME) {
        // --- Static Hold State ---
        CARDS.forEach((_, i) => {
          const mesh = cardMeshes[i];
          const mat = cardMaterials[i];

          // Compute card's relative slot in the stack (0 = front, 1 = behind 1, etc.)
          const slot = (i - activeIdx + 4) % 4;
          const cfg = SLOT_CONFIGS[slot];

          mesh.position.set(cfg.x, cfg.y, cfg.z);
          mesh.rotation.z = cfg.rotZ;
          mesh.scale.set(cfg.scale, cfg.scale, 1);
          mat.opacity = cfg.opacity;
          mesh.renderOrder = cfg.renderOrder;
        });

        // Background glow color
        glowMaterial.color.set(CARDS[activeIdx].glowHex);

        // Mirror reflection mirrors the front card
        reflectionMaterial.map = canvasTextures[activeIdx];
        reflectionMaterial.opacity = 0.22;
        reflectionMesh.position.x = 0;
        reflectionMesh.rotation.z = 0;
      } else {
        // --- Transition State (0.6s easeInOutCubic) ---
        const t = (timeInStep - HOLD_TIME) / TRANS_TIME;
        const ease = easeInOutCubic(Math.min(Math.max(t, 0), 1));

        CARDS.forEach((_, i) => {
          const mesh = cardMeshes[i];
          const mat = cardMaterials[i];
          const slot = (i - activeIdx + 4) % 4;

          if (slot === 0) {
            // Front card exiting: tilts 10 deg on Z, slides up/left and fades out
            mesh.position.x = lerp(SLOT_CONFIGS[0].x, EXIT_CONFIG.x, ease);
            mesh.position.y = lerp(SLOT_CONFIGS[0].y, EXIT_CONFIG.y, ease);
            mesh.position.z = lerp(SLOT_CONFIGS[0].z, EXIT_CONFIG.z, ease);
            mesh.rotation.z = lerp(SLOT_CONFIGS[0].rotZ, EXIT_CONFIG.rotZ, ease);
            const sc = lerp(SLOT_CONFIGS[0].scale, EXIT_CONFIG.scale, ease);
            mesh.scale.set(sc, sc, 1);
            mat.opacity = lerp(SLOT_CONFIGS[0].opacity, EXIT_CONFIG.opacity, ease);
            mesh.renderOrder = EXIT_CONFIG.renderOrder;
          } else if (slot === 1) {
            // Next card moves forward from Slot 1 to Slot 0 and scales up
            mesh.position.x = lerp(SLOT_CONFIGS[1].x, SLOT_CONFIGS[0].x, ease);
            mesh.position.y = lerp(SLOT_CONFIGS[1].y, SLOT_CONFIGS[0].y, ease);
            mesh.position.z = lerp(SLOT_CONFIGS[1].z, SLOT_CONFIGS[0].z, ease);
            mesh.rotation.z = lerp(SLOT_CONFIGS[1].rotZ, SLOT_CONFIGS[0].rotZ, ease);
            const sc = lerp(SLOT_CONFIGS[1].scale, SLOT_CONFIGS[0].scale, ease);
            mesh.scale.set(sc, sc, 1);
            mat.opacity = lerp(SLOT_CONFIGS[1].opacity, SLOT_CONFIGS[0].opacity, ease);
            mesh.renderOrder = SLOT_CONFIGS[0].renderOrder;
          } else if (slot === 2) {
            // Slot 2 moves to Slot 1
            mesh.position.x = lerp(SLOT_CONFIGS[2].x, SLOT_CONFIGS[1].x, ease);
            mesh.position.y = lerp(SLOT_CONFIGS[2].y, SLOT_CONFIGS[1].y, ease);
            mesh.position.z = lerp(SLOT_CONFIGS[2].z, SLOT_CONFIGS[1].z, ease);
            mesh.rotation.z = lerp(SLOT_CONFIGS[2].rotZ, SLOT_CONFIGS[1].rotZ, ease);
            const sc = lerp(SLOT_CONFIGS[2].scale, SLOT_CONFIGS[1].scale, ease);
            mesh.scale.set(sc, sc, 1);
            mat.opacity = lerp(SLOT_CONFIGS[2].opacity, SLOT_CONFIGS[1].opacity, ease);
            mesh.renderOrder = SLOT_CONFIGS[1].renderOrder;
          } else {
            // Slot 3 enters to Slot 2
            mesh.position.x = lerp(SLOT_CONFIGS[3].x, SLOT_CONFIGS[2].x, ease);
            mesh.position.y = lerp(SLOT_CONFIGS[3].y, SLOT_CONFIGS[2].y, ease);
            mesh.position.z = lerp(SLOT_CONFIGS[3].z, SLOT_CONFIGS[2].z, ease);
            mesh.rotation.z = lerp(SLOT_CONFIGS[3].rotZ, SLOT_CONFIGS[2].rotZ, ease);
            const sc = lerp(SLOT_CONFIGS[3].scale, SLOT_CONFIGS[2].scale, ease);
            mesh.scale.set(sc, sc, 1);
            mat.opacity = lerp(SLOT_CONFIGS[3].opacity, SLOT_CONFIGS[2].opacity, ease);
            mesh.renderOrder = SLOT_CONFIGS[2].renderOrder;
          }
        });

        // Background glow cross-fade
        cCurrentGlow.set(CARDS[activeIdx].glowHex);
        cNextGlow.set(CARDS[nextIdx].glowHex);
        glowMaterial.color.lerpColors(cCurrentGlow, cNextGlow, ease);

        // Reflection transition
        if (ease < 0.5) {
          reflectionMaterial.map = canvasTextures[activeIdx];
          reflectionMaterial.opacity = lerp(0.22, 0.05, ease * 2);
        } else {
          reflectionMaterial.map = canvasTextures[nextIdx];
          reflectionMaterial.opacity = lerp(0.05, 0.22, (ease - 0.5) * 2);
        }
      }

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // --- 12. Complete Cleanup Function ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerleave', onPointerLeave);

      // Dispose scene objects, geometries, materials, and textures
      cardGeometry.dispose();
      glowGeometry.dispose();
      glowMaterial.dispose();
      glowTexture.dispose();
      alphaTexture.dispose();
      reflectionMaterial.dispose();

      cardMaterials.forEach((m) => m.dispose());
      canvasTextures.forEach((t) => t.dispose());

      renderer.dispose();

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden select-none touch-none ${className}`}
      style={{ background: '#f6f6f4' }}
    />
  );
}
