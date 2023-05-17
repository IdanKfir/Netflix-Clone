import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

import { PrismaClient } from '@prisma/client'; // Import the PrismaClient type
import { authOptions } from '@/pages/api/auth/[...nextauth]';

const prismadb = new PrismaClient(); // Instantiate the PrismaClient

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) {
    throw new Error('Not signed in');
  }

  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    throw new Error('Not signed in');
  }

  return { currentUser };
};

export default serverAuth;
