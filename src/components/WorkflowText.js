import React, { useState } from 'react';
import { Copy, Check, Wand2, ImagePlus } from 'lucide-react';
import { getEnhancedPrompt, generateImage } from '../utils/apiHelpers';
import ImageCard from './ImageCard';

export default function WorkflowText({ onLoadingChange, onStatusChange }) {
  const [userPrompt, setUserPrompt] = useState('');
  const [enhancedPrompt, setEnhancedPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const [step, setStep] = useState('input'); // input, enhancing, editing, generating, done
  const [copied, setCopied] = useState(false);

  const handleEnhance = async () => {
    if (!userPrompt.trim()) {
      onStatusChange('Please enter a prompt first', 'error');
      return;
    }

    setStep('enhancing');
    onLoadingChange(true);
    onStatusChange('✨ Enhancing your prompt with AI magic...', 'loading');

    try {
      const enhanced = await getEnhancedPrompt(userPrompt);
      setEnhancedPrompt(enhanced);
      setStep('editing');
      onStatusChange('✅ Prompt enhanced! Review and edit if needed.', 'success');
    } catch (error) {
      onStatusChange(`Enhancement failed: ${error.message}`, 'error');
      setStep('input');
    } finally {
      onLoadingChange(false);
    }
  };

  const handleGenerateImage = async () => {
    if (!enhancedPrompt.trim()) {
      onStatusChange('No prompt to generate from', 'error');
      return;
    }

    setStep('generating');
    onLoadingChange(true);
    onStatusChange('🎨 Generating your image (this may take 30-60 seconds)...', 'loading');

    try {
      const imageUrl = await generateImage(enhancedPrompt);
      setGeneratedImage(imageUrl);
      setStep('done');
      onStatusChange('🎉 Image generated successfully!', 'success');
    } catch (error) {
      onStatusChange(`Generation failed: ${error.message}`, 'error');
      setStep('editing');
    } finally {
      onLoadingChange(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(enhancedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetWorkflow = () => {
    setUserPrompt('');
    setEnhancedPrompt('');
    setGeneratedImage('');
    setStep('input');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Panel - Input & Controls */}
      <div className="space-y-6">
        {/* Step 1: Input Prompt */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">📝</span> Your Idea
          </h2>
          <textarea
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            placeholder="Describe what you want to see... (e.g., 'A futuristic city with flying cars at sunset')"
            disabled={step !== 'input' && step !== 'done'}
            className="w-full h-40 bg-white/5 border border-white/20 rounded-lg p-4 text-white placeholder-white/40 resize-none"
          />
          <button
            onClick={handleEnhance}
            disabled={!userPrompt.trim() || step === 'enhancing'}
            className="mt-4 w-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            <Wand2 size={20} />
            {step === 'enhancing' ? 'Enhancing...' : 'Enhance with AI ✨'}
          </button>
        </div>

        {/* Step 2: Review & Edit */}
        {(step === 'editing' || step === 'generating' || step === 'done') && (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 fade-in">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">✨</span> Enhanced Prompt
            </h2>
            <textarea
              value={enhancedPrompt}
              onChange={(e) => setEnhancedPrompt(e.target.value)}
              disabled={step === 'generating'}
              className="w-full h-32 bg-white/5 border border-white/20 rounded-lg p-4 text-white placeholder-white/40 resize-none"
            />
            <div className="flex gap-2 mt-4">
              <button
                onClick={copyToClipboard}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <button
                onClick={handleGenerateImage}
                disabled={step === 'generating'}
                className="flex-1 bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-bold py-2 px-4 rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                <ImagePlus size={18} />
                {step === 'generating' ? 'Generating...' : 'Generate Image 🎨'}
              </button>
            </div>
          </div>
        )}

        {/* Reset Button */}
        {step === 'done' && (
          <button
            onClick={resetWorkflow}
            className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-lg transition-all"
          >
            ↺ Start Over
          </button>
        )}
      </div>

      {/* Right Panel - Results */}
      <div className="space-y-6">
        {generatedImage && (
          <div className="fade-in">
            <ImageCard 
              imageUrl={generatedImage}
              title="Generated Image"
              description={enhancedPrompt}
              onDownload={() => {
                const link = document.createElement('a');
                link.href = generatedImage;
                link.download = 'pear-media-image.png';
                link.click();
              }}
            />
          </div>
        )}

        {step === 'input' && (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 border-dashed flex flex-col items-center justify-center min-h-96 text-center">
            <span className="text-6xl mb-4">📋</span>
            <p className="text-white/70">
              Enter your creative idea above and let AI enhance it into a detailed image prompt.
            </p>
          </div>
        )}

        {(step === 'enhancing' || step === 'generating') && (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 flex flex-col items-center justify-center min-h-96">
            <div className="text-6xl mb-4 spin">⚙️</div>
            <p className="text-white font-semibold">
              {step === 'enhancing' ? 'Enhancing your prompt...' : 'Generating your masterpiece...'}
            </p>
            <div className="mt-4 flex gap-1">
              <div className="w-3 h-3 bg-indigo-400 rounded-full pulse"></div>
              <div className="w-3 h-3 bg-violet-400 rounded-full pulse animation-delay-100"></div>
              <div className="w-3 h-3 bg-purple-400 rounded-full pulse animation-delay-200"></div>
            </div>
          </div>
        )}

        {step === 'editing' && !generatedImage && (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 border-dashed flex flex-col items-center justify-center min-h-96 text-center">
            <span className="text-6xl mb-4">✅</span>
            <p className="text-white/70">
              Your prompt has been enhanced! Review it on the left, then click "Generate Image" to create your visual.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
