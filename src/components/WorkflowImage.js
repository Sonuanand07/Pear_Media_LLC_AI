import React, { useState } from 'react';
/* eslint-disable no-unused-vars */
import { Download } from 'lucide-react';
import { Upload, Zap } from 'lucide-react';
import { analyzeImage, generateImageVariation } from '../utils/apiHelpers';
import ImageCard from './ImageCard';

export default function WorkflowImage({ onLoadingChange, onStatusChange }) {
  const [uploadedImage, setUploadedImage] = useState('');
  const [imageAnalysis, setImageAnalysis] = useState('');
  const [generatedVariations, setGeneratedVariations] = useState([]);
  const [step, setStep] = useState('upload'); // upload, analyzing, generating, done
  const [fileName, setFileName] = useState('');
  const [styleVariant, setStyleVariant] = useState('');

  const styleOptions = [
    { id: 'oil-painting', name: '🎨 Oil Painting', prompt: 'oil painting style' },
    { id: 'cyberpunk', name: '🤖 Cyberpunk', prompt: 'cyberpunk neon style' },
    { id: 'watercolor', name: '🌊 Watercolor', prompt: 'watercolor art style' },
    { id: 'minimalist', name: '⬜ Minimalist', prompt: 'minimalist line art' },
    { id: 'anime', name: '✨ Anime', prompt: 'anime illustration style' },
    { id: '3d-render', name: '🎬 3D Render', prompt: '3D CGI render style' },
  ];

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      onStatusChange('Image must be smaller than 5MB', 'error');
      return;
    }

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = async (event) => {
      setUploadedImage(event.target.result);
      await analyzeImageFile(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const analyzeImageFile = async (base64Image) => {
    setStep('analyzing');
    onLoadingChange(true);
    onStatusChange('🔍 Analyzing image with AI vision...', 'loading');

    try {
      const analysis = await analyzeImage(base64Image);
      setImageAnalysis(analysis);
      setStep('generating');
      onStatusChange('✅ Image analyzed! Select a style to generate variations.', 'success');
    } catch (error) {
      onStatusChange(`Analysis failed: ${error.message}`, 'error');
      setStep('upload');
      setUploadedImage('');
    } finally {
      onLoadingChange(false);
    }
  };

  const handleGenerateVariation = async (style) => {
    setStyleVariant(style.name);
    onLoadingChange(true);
    onStatusChange(`🎨 Generating ${style.name} variation...`, 'loading');

    try {
      const prompt = `${imageAnalysis}\n\nRegenerate this image in ${style.prompt} style while maintaining the core elements and composition.`;
      const imageUrl = await generateImageVariation(prompt);
      setGeneratedVariations([...generatedVariations, { url: imageUrl, style: style.name }]);
      onStatusChange(`✨ ${style.name} variation created!`, 'success');
    } catch (error) {
      onStatusChange(`Generation failed: ${error.message}`, 'error');
    } finally {
      onLoadingChange(false);
      setStyleVariant('');
    }
  };

  const resetWorkflow = () => {
    setUploadedImage('');
    setImageAnalysis('');
    setGeneratedVariations([]);
    setStep('upload');
    setFileName('');
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Panel - Upload & Analysis */}
        <div className="space-y-6">
          {/* Upload Section */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border-2 border-dashed border-white/20">
            <label className="cursor-pointer block">
              <div className="flex flex-col items-center justify-center py-12">
                <Upload size={48} className="text-indigo-300 mb-4" />
                <p className="text-white font-semibold mb-2">
                  {fileName || 'Click to upload image'}
                </p>
                <p className="text-white/50 text-sm">PNG, JPG up to 5MB</p>
              </div>
              <input
                type="file"
                onChange={handleImageUpload}
                accept="image/*"
                disabled={step !== 'upload' && step !== 'done'}
                className="hidden"
              />
            </label>
          </div>

          {/* Analysis Section */}
          {imageAnalysis && (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 fade-in">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">🔍</span> Image Analysis
              </h2>
              <div className="bg-white/5 rounded-lg p-4 text-white/80 text-sm max-h-48 overflow-y-auto whitespace-pre-wrap">
                {imageAnalysis}
              </div>
            </div>
          )}
        </div>

        {/* Right Panel - Preview */}
        <div className="space-y-6">
          {uploadedImage && (
            <div className="fade-in">
              <ImageCard 
                imageUrl={uploadedImage}
                title="Uploaded Image"
                description={fileName}
                onDownload={() => {
                  const link = document.createElement('a');
                  link.href = uploadedImage;
                  link.download = fileName;
                  link.click();
                }}
              />
            </div>
          )}

          {step === 'analyzing' && (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 flex flex-col items-center justify-center min-h-96">
              <div className="text-6xl mb-4 spin">🔍</div>
              <p className="text-white font-semibold">Analyzing your image...</p>
              <div className="mt-4 flex gap-1">
                <div className="w-3 h-3 bg-indigo-400 rounded-full pulse"></div>
                <div className="w-3 h-3 bg-violet-400 rounded-full pulse"></div>
                <div className="w-3 h-3 bg-purple-400 rounded-full pulse"></div>
              </div>
            </div>
          )}

          {step === 'upload' && !uploadedImage && (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 border-dashed flex flex-col items-center justify-center min-h-96 text-center">
              <span className="text-6xl mb-4">📸</span>
              <p className="text-white/70">
                Upload an image to analyze its style and generate variations.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Style Variations */}
      {(step === 'generating' || step === 'done') && (
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 fade-in">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Zap size={28} />
            Generate Style Variations
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {styleOptions.map((style) => (
              <button
                key={style.id}
                onClick={() => handleGenerateVariation(style)}
                disabled={styleVariant !== '' || step !== 'generating'}
                className="bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed border border-white/20 rounded-lg p-4 text-white font-semibold transition-all flex flex-col items-center justify-center min-h-32 gap-2"
              >
                <span className="text-3xl">{style.name.split(' ')[0]}</span>
                <span className="text-sm text-white/70">{style.name}</span>
              </button>
            ))}
          </div>

          {/* Generated Variations */}
          {generatedVariations.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white">Generated Variations:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {generatedVariations.map((variation, idx) => (
                  <div key={idx} className="fade-in">
                    <ImageCard 
                      imageUrl={variation.url}
                      title={variation.style}
                      onDownload={() => {
                        const link = document.createElement('a');
                        link.href = variation.url;
                        link.download = `pear-media-${variation.style.replace(/\s+/g, '-').toLowerCase()}.png`;
                        link.click();
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reset Button */}
          {step === 'generating' && generatedVariations.length > 0 && (
            <button
              onClick={resetWorkflow}
              className="mt-8 w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-lg transition-all"
            >
              ↺ Start Over
            </button>
          )}
        </div>
      )}
    </div>
  );
}
