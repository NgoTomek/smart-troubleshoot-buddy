
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Home, Check, Zap, Crown, Rocket } from 'lucide-react';

interface PricingPageProps {
  onBackToHome: () => void;
}

export const PricingPage = ({ onBackToHome }: PricingPageProps) => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for occasional troubleshooting",
      icon: Zap,
      color: "border-gray-200",
      buttonText: "Get Started",
      buttonVariant: "outline" as const,
      features: [
        "5 AI diagnoses per month",
        "Basic error analysis",
        "Community solutions",
        "Standard support",
        "Web access only"
      ],
      limitations: [
        "Limited to 5 uploads/month",
        "Basic priority support"
      ]
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "/month",
      description: "For professionals and frequent users",
      icon: Crown,
      color: "border-blue-500 ring-2 ring-blue-200",
      buttonText: "Start Free Trial",
      buttonVariant: "default" as const,
      popular: true,
      features: [
        "Unlimited AI diagnoses",
        "Advanced error pattern recognition",
        "Priority community solutions",
        "24/7 priority support",
        "Mobile app access",
        "Solution bookmarking",
        "Export diagnostic reports",
        "Custom solution templates"
      ],
      limitations: []
    },
    {
      name: "Enterprise",
      price: "$49.99",
      period: "/month",
      description: "For teams and organizations",
      icon: Rocket,
      color: "border-purple-500",
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const,
      features: [
        "Everything in Pro",
        "Team collaboration tools",
        "Custom AI training",
        "White-label solution",
        "API access",
        "Advanced analytics",
        "Dedicated account manager",
        "Custom integrations",
        "SSO authentication",
        "Compliance features"
      ],
      limitations: []
    }
  ];

  const stats = [
    {
      value: "10M+",
      label: "Solutions in Database"
    },
    {
      value: "95%",
      label: "Average Success Rate"
    },
    {
      value: "2.3 min",
      label: "Average Resolution Time"
    },
    {
      value: "500K+",
      label: "Happy Users"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={onBackToHome}
          className="mb-4"
        >
          <Home className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </div>

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Choose the plan that fits your needs. All plans include our core AI-powered troubleshooting features.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-slate-600">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Pricing Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {plans.map((plan, index) => (
          <Card key={index} className={`relative ${plan.color} ${plan.popular ? 'scale-105' : ''}`}>
            {plan.popular && (
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">
                Most Popular
              </Badge>
            )}
            
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <plan.icon className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <div className="text-3xl font-bold">
                {plan.price}
                <span className="text-sm font-normal text-slate-600">{plan.period}</span>
              </div>
              <p className="text-sm text-slate-600">{plan.description}</p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <Button 
                className="w-full" 
                variant={plan.buttonVariant}
                size="lg"
              >
                {plan.buttonText}
              </Button>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">What's included:</h4>
                <ul className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Can I upgrade or downgrade anytime?</h3>
              <p className="text-sm text-slate-600">
                Yes! You can change your plan at any time. Upgrades take effect immediately, and downgrades take effect at the next billing cycle.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Is there a free trial?</h3>
              <p className="text-sm text-slate-600">
                Yes, Pro plan comes with a 14-day free trial. No credit card required to start.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
              <p className="text-sm text-slate-600">
                We accept all major credit cards, PayPal, and bank transfers for Enterprise customers.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">How accurate are the AI solutions?</h3>
              <p className="text-sm text-slate-600">
                Our AI has a 95% average success rate across all problem types, with continuous learning from user feedback.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Is my data secure?</h3>
              <p className="text-sm text-slate-600">
                Absolutely. We use enterprise-grade encryption and never store your screenshots permanently. All data is processed securely.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Can I cancel anytime?</h3>
              <p className="text-sm text-slate-600">
                Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center mt-12">
        <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-slate-600 mb-6">
          Join thousands of users who've solved their tech problems with TechFix AI
        </p>
        <div className="flex justify-center space-x-4">
          <Button 
            size="lg" 
            onClick={onBackToHome}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Start Free Trial
          </Button>
          <Button 
            variant="outline" 
            size="lg"
          >
            Contact Sales
          </Button>
        </div>
      </div>
    </div>
  );
};
