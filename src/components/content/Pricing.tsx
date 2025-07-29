import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "5 AI-generated content ideas per month",
        "Basic templates access",
        "Standard support",
        "Export to PDF",
        "1 social media platform connection"
      ],
      popular: false,
      buttonText: "Current Plan",
      buttonVariant: "outline" as const
    },
    {
      name: "Pro",
      price: "$29",
      period: "month",
      description: "For content creators and businesses",
      features: [
        "Unlimited AI-generated content ideas",
        "Premium script templates library",
        "All social media platforms connection",
        "Advanced analytics & insights",
        "Priority support",
        "Custom branding",
        "Team collaboration (up to 5 members)",
        "API access",
        "Advanced export options"
      ],
      popular: true,
      buttonText: "Upgrade to Pro",
      buttonVariant: "default" as const
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      description: "For large teams and organizations",
      features: [
        "Everything in Pro",
        "Unlimited team members",
        "Custom integrations",
        "Dedicated account manager",
        "Custom training sessions",
        "SLA guarantee",
        "Advanced security features",
        "Custom deployment options"
      ],
      popular: false,
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Choose Your Plan</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Scale your content creation with the right plan for your needs
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-8 mt-12">
        {plans.map((plan) => (
          <Card key={plan.name} className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : 'border-border'}`}>
            {plan.popular && (
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                <Star className="w-3 h-3 mr-1" />
                Most Popular
              </Badge>
            )}
            
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                {plan.price !== "Custom" && (
                  <span className="text-muted-foreground">/{plan.period}</span>
                )}
              </div>
            </CardHeader>

            <CardContent>
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter>
              <Button 
                variant={plan.buttonVariant} 
                className="w-full"
                disabled={plan.name === "Free"}
              >
                {plan.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="mt-16 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">Can I change my plan anytime?</h3>
            <p className="text-muted-foreground">Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">What payment methods do you accept?</h3>
            <p className="text-muted-foreground">We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">Is there a free trial for Pro plan?</h3>
            <p className="text-muted-foreground">Yes, we offer a 14-day free trial for the Pro plan with no credit card required.</p>
          </div>
        </div>
      </div>
    </div>
  );
};