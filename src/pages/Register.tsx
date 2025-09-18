import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { User, Mail, Phone, Lock, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface RegisterFormData {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  otp?: string;
}

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<"form" | "otp">("form");
  const [formData, setFormData] = useState<RegisterFormData | null>(null);

  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterFormData>();
  const password = watch("password");

  const onSubmitForm = async (data: RegisterFormData) => {
    if (data.password !== data.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Password and confirm password do not match.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate sending OTP
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setFormData(data);
      setStep("otp");
      toast({
        title: "OTP sent",
        description: `Verification code sent to ${data.mobileNumber}`,
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

  const onSubmitOTP = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      // Simulate OTP verification and registration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (data.otp === "123456") { // Mock OTP validation
        toast({
          title: "Account created successfully",
          description: "Welcome to Physiotherapy Management System",
        });
        navigate("/login");
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Create Account</h1>
          <p className="text-muted-foreground">Set up your admin account</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>
              {step === "form" ? "Admin Registration" : "Verify Mobile Number"}
            </CardTitle>
            <CardDescription>
              {step === "form" 
                ? "Fill in your details to create an account"
                : "Enter the verification code sent to your mobile"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === "form" ? (
              <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      {...register("firstName", { required: "First name is required" })}
                    />
                    {errors.firstName && (
                      <p className="text-sm text-destructive">{errors.firstName.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      {...register("lastName", { required: "Last name is required" })}
                    />
                    {errors.lastName && (
                      <p className="text-sm text-destructive">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobileNumber">Mobile Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="mobileNumber"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      className="pl-9"
                      {...register("mobileNumber", {
                        required: "Mobile number is required",
                        pattern: {
                          value: /^[\+]?[1-9][\d]{0,15}$/,
                          message: "Invalid mobile number"
                        }
                      })}
                    />
                  </div>
                  {errors.mobileNumber && (
                    <p className="text-sm text-destructive">{errors.mobileNumber.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@hospital.com"
                      className="pl-9"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Invalid email address"
                        }
                      })}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a strong password"
                      className="pl-9"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters"
                        }
                      })}
                    />
                  </div>
                  {errors.password && (
                    <p className="text-sm text-destructive">{errors.password.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      className="pl-9"
                      {...register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: value => value === password || "Passwords do not match"
                      })}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    "Creating Account..."
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleSubmit(onSubmitOTP)} className="space-y-4">
                <div className="text-center mb-4">
                  <p className="text-sm text-muted-foreground">
                    We've sent a 6-digit code to
                  </p>
                  <p className="font-medium">{formData?.mobileNumber}</p>
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

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    "Verifying..."
                  ) : (
                    <>
                      Verify & Create Account
                      <Check className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>

                <div className="text-center">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setStep("form")}
                    className="text-sm"
                  >
                    Back to registration
                  </Button>
                </div>
              </form>
            )}

            <div className="mt-6 text-center">
              <span className="text-sm text-muted-foreground">Already have an account? </span>
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

export default Register;