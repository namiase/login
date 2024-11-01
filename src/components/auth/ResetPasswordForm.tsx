import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Mail, CircleDot, ArrowLeft } from 'lucide-react';
import { requestPasswordReset } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';

export function ResetPasswordForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const exists = await requestPasswordReset(email);
      if (exists) {
        toast({
          title: 'Password Reset Requested',
          description: 'Check your email for further instructions.',
        });
        navigate('/');
      } else {
        setError('User does not exist');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md px-4 py-8">
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-2 text-white">
            <CircleDot size={32} />
            <span className="text-2xl font-bold">InvoiceSystem</span>
          </div>
        </div>
        <Card className="w-full backdrop-blur-sm bg-white/95 shadow-xl">
          <CardHeader className="space-y-1">
            <h2 className="text-2xl font-bold text-center">Reset Password</h2>
            <p className="text-sm text-muted-foreground text-center">
              Enter your email to reset your password
            </p>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                {error && (
                  <p className="text-sm text-red-500 mt-1">{error}</p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Requesting...' : 'Reset Password'}
              </Button>
              <Link
                to="/"
                className="text-sm text-center text-indigo-600 hover:text-indigo-700 hover:underline transition-colors inline-flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to login
              </Link>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}