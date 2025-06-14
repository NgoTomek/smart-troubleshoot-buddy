
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, ChevronDown, ChevronRight, HelpCircle, Lightbulb } from 'lucide-react';

const faqData = [
  {
    id: 1,
    question: "How accurate is the AI diagnosis?",
    answer: "Our AI has been trained on thousands of error patterns and maintains an average accuracy rate of 87%. The system continuously learns from user feedback to improve its recommendations.",
    category: "accuracy",
    tags: ["ai", "accuracy", "diagnosis"]
  },
  {
    id: 2,
    question: "What types of errors can TechFix AI handle?",
    answer: "TechFix AI can diagnose network connectivity issues, software errors, browser problems, system crashes, authentication failures, and many other common technical problems. It works best with clear error messages and screenshots.",
    category: "capabilities",
    tags: ["errors", "types", "capabilities"]
  },
  {
    id: 3,
    question: "How long does the analysis usually take?",
    answer: "Most analyses complete within 2-5 seconds. Complex issues with multiple potential causes may take slightly longer as our AI evaluates more solution paths.",
    category: "performance",
    tags: ["speed", "time", "analysis"]
  },
  {
    id: 4,
    question: "Can I use this for enterprise/work issues?",
    answer: "Yes! TechFix AI is designed to handle both personal and professional technical issues. However, be mindful of sharing sensitive company information in your descriptions.",
    category: "usage",
    tags: ["enterprise", "work", "business"]
  },
  {
    id: 5,
    question: "What if none of the suggested solutions work?",
    answer: "If our initial suggestions don't resolve your issue, you can provide feedback and request alternative solutions. Our AI will analyze your feedback and suggest different approaches.",
    category: "troubleshooting",
    tags: ["failed", "alternative", "feedback"]
  }
];

export const FAQSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'accuracy', 'capabilities', 'performance', 'usage', 'troubleshooting'];

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleExpanded = (id: number) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <HelpCircle className="w-8 h-8 text-blue-600" />
          <h2 className="text-3xl font-bold text-slate-900">Frequently Asked Questions</h2>
        </div>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Find answers to common questions about TechFix AI and how to get the most out of our intelligent troubleshooting platform.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search FAQ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-8">
                <Lightbulb className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <p className="text-slate-500">No FAQs match your search criteria.</p>
              </div>
            ) : (
              filteredFAQs.map((faq) => (
                <div key={faq.id} className="border border-slate-200 rounded-lg">
                  <button
                    onClick={() => toggleExpanded(faq.id)}
                    className="w-full p-4 text-left hover:bg-slate-50 transition-colors flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 mb-2">{faq.question}</h3>
                      <div className="flex flex-wrap gap-1">
                        {faq.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    {expandedItems.includes(faq.id) ? (
                      <ChevronDown className="w-5 h-5 text-slate-500" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-slate-500" />
                    )}
                  </button>
                  
                  {expandedItems.includes(faq.id) && (
                    <div className="px-4 pb-4 border-t border-slate-100">
                      <p className="text-slate-600 leading-relaxed pt-3">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
