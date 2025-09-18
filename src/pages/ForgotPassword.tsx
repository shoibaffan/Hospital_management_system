import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Mail, Phone, Lock, ArrowRight, Check, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface ForgotPasswordFormData {
  identifier: string; // email or mobile
  otp?: string;
  newPassword?: string;
  confirmPassword?: string;
}

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<"identifier" | "otp" | "reset">("identifier");
  const [method, setMethod] = useState<"email" | "mobile">("email");
  const [savedIdentifier, setSavedIdentifier] = useState<string>("");

  const { register, handleSubmit, formState: { errors }, watch } = useForm<ForgotPasswordFormData>();
  const newPassword = watch("newPassword");

  const onSubmitIdentifier = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    try {
      // Simulate sending OTP
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSavedIdentifier(data.identifier);
      setStep("otp");
      toast({
        title: "OTP sent",
        description: `Verification code sent to ${data.identifier}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitOTP = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (data.otp === "123456") { // Mock OTP validation
        setStep("reset");
        toast({
          title: "OTP verified",
          description: "Now create your new password",
        });
      } else {
        throw new Error("Invalid OTP");
      }
    } catch (error) {
      toast({
        title: "Invalid OTP",
        description: "Please check the verification code and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitReset = async (data: ForgotPasswordFormData) => {
    if (data.newPassword !== data.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "New password and confirm password do not match.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate password reset
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Password reset successful",
        description: "Your password has been updated. Please log in with your new password.",
      });
      navigate("/login");
    } catch (error) {
      toast({
        title: "Reset failed",
        description: "Failed to reset password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitForm = (data: ForgotPasswordFormData) => {
    switch (step) {
      case "identifier":
        return onSubmitIdentifier(data);
      case "otp":
        return onSubmitOTP(data);
      case "reset":
        return onSubmitReset(data);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <KeyRound className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Reset Password</h1>
          <p className="text-muted-foreground">
            {step === "identifier" && "Enter your email or mobile number"}
            {step === "otp" && "Verify your identity"}
            {step === "reset" && "Create a new password"}
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>
              {step === "identifier" && "Forgot Password"}
              {step === "otp" && "Verify Identity"}
              {step === "reset" && "Reset Password"}
            </CardTitle>
            <CardDescription>
              {step === "identifier" && "We'll send you a verification code"}
              {step === "otp" && "Enter the code sent to your device"}
              {step === "reset" && "Choose a strong new password"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-4">
              {step === "identifier" && (
                <>
                  <Tabs value={method} onValueChange={(value: any) => setMethod(value)}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="email">Email</TabsTrigger>
                      <TabsTrigger value="mobile">Mobile</TabsTrigger>
                    </TabsList>

                    <TabsContent value="email" className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="admin@hospital.com"
                            className="pl-9"
                            {...register("identifier", {
                              required: "Email is required",
                              pattern: {
                                value: /^\S+@\S+$/i,
                                message: "Invalid email address"
                              }
                            })}
                          />
                        </div>
                        {errors.identifier && (
                          <p className="text-sm text-destructive">{errors.identifier.message}</p>
                        )}
                      </div>
                    </TabsContent>

                    <TabsContent value="mobile" className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="mobile">Mobile Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="mobile"
                            type="tel"
                            placeholder="+1 (555) 123-4567"
                            className="pl-9"
                            {...register("identifier", {
                              required: "Mobile number is required",
                              pattern: {
                                value: /^[\+]?[1-9][\d]{0,15}$/,
                                message: "Invalid mobile number"
                              }
                            })}
                          />
                        </div>
                        {errors.identifier && (
                          <p className="text-sm text-destructive">{errors.identifier.message}</p>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </>
              )}

              {step === "otp" && (
                <>
                  <div className="text-center mb-4">
                    <p className="text-sm text-muted-foreground">
                      We've sent a 6-digit code to
                    </p>
                    <p className="font-medium">{savedIdentifier}</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="otp">Verification Code</Label>
                    <Input
                      id="otp"
                      type="text"
                      placeholder="123456"
                      maxLength={6}
                      className="text-center text-lg tracking-widest"
                      {...register("otp", {
                        required: "Verification code is required",
                        pattern: {
                          value: /^\d{6}$/,
                          message: "Code must be 6 digits"
                        }
                      })}
                    />
                    {errors.otp && (
                      <p className="text-sm text-destructive">{errors.otp.message}</p>
                    )}
                  </div>
                </>
              )}

              {step === "reset" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="newPassword"
                        type="password"
                        placeholder="Create a strong password"
                        className="pl-9"
                        {...register("newPassword", {
                          required: "New password is required",
                          minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters"
                          }
                        })}
                      />
                    </div>
                    {errors.newPassword && (
                      <p className="text-sm text-destructive">{errors.newPassword.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your new password"
                        className="pl-9"
                        {...register("confirmPassword", {
                          required: "Please confirm your new password",
                          validate: value => value === newPassword || "Passwords do not match"
                        })}
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
                    )}
                  </div>
                </>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  "Processing..."
                ) : (
                  <>
                    {step === "identifier" && "Send Verification Code"}
                    {step === "otp" && "Verify Code"}
                    {step === "reset" && "Reset Password"}
                    {step === "reset" ? <Check className="ml-2 w-4 h-4" /> : <ArrowRight className="ml-2 w-4 h-4" />}
                  </>
                )}
              </Button>

              {step === "otp" && (
                <div className="text-center">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setStep("identifier")}
                    className="text-sm"
                  >
                    Back to email/mobile
                  </Button>
                </div>
              )}
            </form>

            <div className="mt-6 text-center">
              <span className="text-sm text-muted-foreground">Remember your password? </span>
              <Link 
                to="/login" 
                className="text-sm text-primary hover:underline font-medium"
              >
                Sign In
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;