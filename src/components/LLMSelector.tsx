import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { LLM_PROVIDERS, getApiKey, setApiKey, hasApiKey } from '@/lib/llmServices';
import { Settings, Key } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LLMSelectorProps {
  selectedProvider: string;
  selectedModel: string;
  onProviderChange: (provider: string) => void;
  onModelChange: (model: string) => void;
}

export const LLMSelector: React.FC<LLMSelectorProps> = ({
  selectedProvider,
  selectedModel,
  onProviderChange,
  onModelChange
}) => {
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  const [tempApiKey, setTempApiKey] = useState('');
  const [currentProvider, setCurrentProvider] = useState('');
  const { toast } = useToast();

  const handleProviderChange = (provider: string) => {
    onProviderChange(provider);
    const providerData = LLM_PROVIDERS.find(p => p.id === provider);
    if (providerData && providerData.models.length > 0) {
      onModelChange(providerData.models[0]);
    }
  };

  const handleApiKeySetup = (provider: string) => {
    setCurrentProvider(provider);
    setTempApiKey(getApiKey(provider) || '');
    setShowApiKeyDialog(true);
  };

  const handleSaveApiKey = () => {
    if (!tempApiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid API key",
        variant: "destructive"
      });
      return;
    }

    setApiKey(currentProvider, tempApiKey);
    setShowApiKeyDialog(false);
    toast({
      title: "Success",
      description: `${LLM_PROVIDERS.find(p => p.id === currentProvider)?.name} API key saved successfully!`
    });
  };

  const selectedProviderData = LLM_PROVIDERS.find(p => p.id === selectedProvider);

  return (
    <>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Label className="text-sm font-medium">AI Model:</Label>
          <Select value={selectedProvider} onValueChange={handleProviderChange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select provider" />
            </SelectTrigger>
            <SelectContent>
              {LLM_PROVIDERS.map((provider) => (
                <SelectItem key={provider.id} value={provider.id}>
                  {provider.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedProviderData && (
          <div className="flex items-center gap-2">
            <Select value={selectedModel} onValueChange={onModelChange}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                {selectedProviderData.models.map((model) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {selectedProviderData?.requiresApiKey && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleApiKeySetup(selectedProvider)}
            className={`${hasApiKey(selectedProvider) ? 'border-primary' : 'border-destructive'}`}
          >
            <Key className="h-3 w-3 mr-1" />
            {hasApiKey(selectedProvider) ? 'Configured' : 'Setup API'}
          </Button>
        )}
      </div>

      <Dialog open={showApiKeyDialog} onOpenChange={setShowApiKeyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Configure {LLM_PROVIDERS.find(p => p.id === currentProvider)?.name} API Key
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                type="password"
                value={tempApiKey}
                onChange={(e) => setTempApiKey(e.target.value)}
                placeholder="Enter your API key"
                className="mt-1"
              />
            </div>
            <div className="text-sm text-muted-foreground">
              {currentProvider === 'gemini' && (
                <p>Get your API key from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google AI Studio</a></p>
              )}
              {currentProvider === 'openai' && (
                <p>Get your API key from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">OpenAI Platform</a></p>
              )}
              {currentProvider === 'claude' && (
                <p>Get your API key from <a href="https://console.anthropic.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Anthropic Console</a></p>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowApiKeyDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveApiKey}>
                Save API Key
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};