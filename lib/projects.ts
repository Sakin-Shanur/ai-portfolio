export type Project = {
  id: string
  title: string
  category: string
  summary: string
  stack: string[]
  metrics: { label: string; value: string }[]
  details: string[]
  layout: string
  featured?: boolean
  accent: 'cyber' | 'neon'
}

export const projects: Project[] = [
  {
    id: 'retina-vit',
    title: 'RetinaScope',
    category: 'Computer Vision · Healthcare',
    summary:
      'A Vision Transformer that detects diabetic retinopathy from fundus images, built with a Seoul hospital research lab.',
    stack: ['PyTorch', 'ViT-B/16', 'Grad-CAM', 'ONNX', 'FastAPI'],
    metrics: [
      { label: 'AUC', value: '0.962' },
      { label: 'Images', value: '88K' },
      { label: 'Latency', value: '41ms' },
    ],
    details: [
      'Pre-trained on ImageNet-21k, fine-tuned with class-balanced focal loss to handle a 9:1 label imbalance.',
      'Grad-CAM attention maps surfaced to ophthalmologists for explainable, auditable predictions.',
      'Quantized to INT8 via ONNX Runtime — 3.4× faster inference on hospital CPU-only machines.',
    ],
    layout: 'md:col-span-2 lg:col-span-4 lg:row-span-2',
    featured: true,
    accent: 'cyber',
  },
  {
    id: 'hangul-agent',
    title: 'Hangul Agent',
    category: 'LLMs · Agents',
    summary: 'A tool-using Korean-language assistant for university course registration.',
    stack: ['Llama 3', 'LoRA', 'RAG', 'pgvector'],
    metrics: [
      { label: 'Users', value: '2.1K' },
      { label: 'Accuracy', value: '91%' },
    ],
    details: [
      'LoRA fine-tune on 40K curated Korean instruction pairs.',
      'Hybrid BM25 + dense retrieval over course catalogs and policy PDFs.',
    ],
    layout: 'lg:col-span-2',
    accent: 'neon',
  },
  {
    id: 'fairlens',
    title: 'FairLens',
    category: 'AI Ethics',
    summary: 'An open-source toolkit auditing bias in Korean hiring and credit models.',
    stack: ['scikit-learn', 'SHAP', 'Streamlit'],
    metrics: [
      { label: 'GitHub stars', value: '640' },
      { label: 'Metrics', value: '14' },
    ],
    details: [
      'Computes demographic parity, equalized odds, and counterfactual fairness out of the box.',
      'Presented at the Korea AI Ethics Student Forum 2025.',
    ],
    layout: 'lg:col-span-2',
    accent: 'cyber',
  },
  {
    id: 'edge-whisper',
    title: 'EdgeWhisper',
    category: 'Speech · On-device',
    summary: 'Distilled speech recognition that runs fully offline on a Raspberry Pi 5.',
    stack: ['Whisper', 'Distillation', 'C++'],
    metrics: [
      { label: 'Size', value: '38MB' },
      { label: 'WER', value: '7.8%' },
    ],
    details: [
      'Knowledge distillation from Whisper-small into a 4-layer student model.',
      'Custom C++ inference loop with streaming VAD for real-time captions.',
    ],
    layout: 'lg:col-span-2',
    accent: 'neon',
  },
  {
    id: 'rl-traffic',
    title: 'Gangnam Flow',
    category: 'Reinforcement Learning',
    summary: 'Multi-agent RL controlling traffic signals in a simulated Gangnam grid.',
    stack: ['JAX', 'PPO', 'SUMO'],
    metrics: [
      { label: 'Wait time', value: '−27%' },
      { label: 'Agents', value: '64' },
    ],
    details: [
      'Graph attention policy lets intersections share state with neighbors.',
      'Trained 200M environment steps on a single A100 using vectorized JAX envs.',
    ],
    layout: 'lg:col-span-2',
    accent: 'cyber',
  },
  {
    id: 'neural-gugak',
    title: 'Neural Gugak',
    category: 'Generative AI · Music',
    summary: 'A diffusion model composing new melodies in the style of Korean traditional music.',
    stack: ['Diffusion', 'MIDI', 'Transformers'],
    metrics: [
      { label: 'Pieces', value: '1.2K' },
      { label: 'Listener pref.', value: '68%' },
    ],
    details: [
      'Symbolic music diffusion over piano-roll tokens with pentatonic-aware conditioning.',
      'Blind listening study with 120 participants from the Korean National University of Arts.',
    ],
    layout: 'lg:col-span-2',
    accent: 'neon',
  },
]
