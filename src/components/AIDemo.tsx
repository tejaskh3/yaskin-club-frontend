import React, { useState } from 'react';
import { Upload, Download, Sparkles, Image as ImageIcon, Info } from 'lucide-react';
import { toast } from 'react-hot-toast';

const AIDemo = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPoster, setGeneratedPoster] = useState<string>('');
  const [posterDescription, setPosterDescription] = useState<string>('');
  const [isDescriptionMode, setIsDescriptionMode] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        return;
      }

      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      toast.success('Image uploaded successfully!');
    }
  };

  const generatePoster = async () => {
    if (!selectedImage || !prompt.trim()) {
      toast.error('Please upload an image and enter a message');
      return;
    }

    setIsGenerating(true);
    setGeneratedPoster('');
    setPosterDescription('');
    setIsDescriptionMode(false);

    // Show loading toast
    const loadingToast = toast.loading('Generating your AI poster... This may take a moment ✨');

    try {
      const formData = new FormData();
      formData.append('image', selectedImage);
      formData.append('prompt', prompt);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/generate-poster`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        toast.dismiss(loadingToast);
        
        if (data.data.imageBase64) {
          // Image generation successful
          setGeneratedPoster(`data:${data.data.mimeType || 'image/png'};base64,${data.data.imageBase64}`);
          toast.success('🎉 Your AI poster is ready!');
        } else if (data.data.description) {
          // Fallback to description mode
          setPosterDescription(data.data.description);
          setIsDescriptionMode(true);
          if (data.data.fallbackMode) {
            toast('📝 Generated poster description (image generation temporarily unavailable)', {
              icon: '⚠️',
              duration: 4000,
            });
          } else {
            toast.success('📝 Poster description generated!');
          }
        }
      } else {
        toast.dismiss(loadingToast);
        
        // Handle specific errors
        if (response.status === 429) {
          toast.error('API quota exceeded. Please try again in a few minutes.', {
            duration: 5000,
          });
        } else if (response.status === 401) {
          toast.error('Authentication failed. Please contact support.');
        } else {
          toast.error(data.error || 'Failed to generate poster');
        }
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      console.error('Error generating poster:', error);
      toast.error('Network error. Please check your connection and try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadPoster = () => {
    if (!generatedPoster) return;

    try {
      const link = document.createElement('a');
      link.href = generatedPoster;
      link.download = `yaskin-club-birthday-poster-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Poster downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download poster');
    }
  };

  const copyDescription = () => {
    if (!posterDescription) return;

    navigator.clipboard.writeText(posterDescription).then(() => {
      toast.success('Description copied to clipboard!');
    }).catch(() => {
      toast.error('Failed to copy description');
    });
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Try Our AI Poster Generator
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Upload a team member's photo and let our AI create a beautiful birthday poster in seconds
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Photo
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
                {previewUrl ? (
                  <div className="space-y-4">
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="max-w-full h-48 object-cover mx-auto rounded-lg shadow-md"
                    />
                    <p className="text-sm text-gray-600">{selectedImage?.name}</p>
                    <button
                      onClick={() => document.getElementById('image-upload')?.click()}
                      className="text-purple-600 hover:text-purple-700 font-medium"
                    >
                      Change Image
                    </button>
                  </div>
                ) : (
                  <div 
                    className="cursor-pointer"
                    onClick={() => document.getElementById('image-upload')?.click()}
                  >
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-lg font-medium text-gray-700 mb-2">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-sm text-gray-500">
                      PNG, JPG, GIF up to 5MB
                    </p>
                  </div>
                )}
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>


            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Birthday Message
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Happy Birthday Sarah! Hope you have an amazing day!"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                rows={3}
              />
            </div>


            <button
              onClick={generatePoster}
              disabled={!selectedImage || !prompt.trim() || isGenerating}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>Generating Poster...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  <span>Generate AI Poster</span>
                </>
              )}
            </button>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Generated Poster</h3>
            
            {!generatedPoster && !posterDescription && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                <ImageIcon className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                <p className="text-lg text-gray-500">
                  Your AI-generated poster will appear here
                </p>
              </div>
            )}

            {generatedPoster && (
              <div className="space-y-4">
                <div className="relative">
                  <img 
                    src={generatedPoster} 
                    alt="Generated Birthday Poster" 
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>
                <button
                  onClick={downloadPoster}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Download className="h-5 w-5" />
                  <span>Download Poster</span>
                </button>
              </div>
            )}

            {isDescriptionMode && posterDescription && (
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900 mb-2">Poster Design Description</h4>
                      <p className="text-sm text-blue-800">
                        Image generation is temporarily unavailable. Here's a detailed description of your birthday poster design:
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="prose prose-sm max-w-none">
                    <div className="whitespace-pre-line text-gray-700">
                      {posterDescription}
                    </div>
                  </div>
                </div>

                <button
                  onClick={copyDescription}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <span>📋</span>
                  <span>Copy Description</span>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Love What You See?</h3>
          <p className="text-lg mb-6 opacity-90">
            Join our waitlist to be the first to access yaskin.club when we launch!
          </p>
          <button
            onClick={() => {
              document.getElementById('waitlist-section')?.scrollIntoView({ 
                behavior: 'smooth' 
              });
            }}
            className="bg-white text-purple-600 py-3 px-8 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Join Waitlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIDemo; 