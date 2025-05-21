# Setting Up MongoDB Atlas for StudyBuddy AI

This guide walks you through setting up MongoDB Atlas with vector search capabilities for the StudyBuddy AI project.

## Step 1: Create a MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and sign up for a free account
2. After signing up, click "Build a Database"
3. Choose the FREE tier (M0) - this is sufficient for development and testing
4. Select your preferred provider (AWS, Google Cloud, or Azure) and region (choose one closest to you)
5. Name your cluster (e.g., "studybuddy-cluster")
6. Click "Create Cluster" (the cluster may take a few minutes to provision)

## Step 2: Create a Database User

1. In the left sidebar, click "Database Access" under the Security section
2. Click "Add New Database User"
3. Choose "Password" authentication method
4. Enter a username and password (save these securely!)
5. For user privileges, select "Read and write to any database"
6. Click "Add User"

## Step 3: Set Network Access

1. In the left sidebar, click "Network Access" under the Security section
2. Click "Add IP Address"
3. For development, you can select "Allow Access from Anywhere" (or use your specific IP address for more security)
4. Click "Confirm"

## Step 4: Get Your Connection String

1. In the left sidebar, click "Database" under the Deployments section
2. Click "Connect" on your cluster
3. Select "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user's password and `<dbname>` with your preferred database name (e.g., "studybuddy")

## Step 5: Configure Vector Search (for Embeddings)

1. In your Atlas cluster, click "Search" in the left sidebar
2. Click "Create Search Index"
3. Select "JSON Editor" and click "Next"
4. Choose the database and collection (typically "studybuddy.DocumentChunk")
5. Enter a name for your index (e.g., "vector_index")
6. Replace the JSON configuration with the following:

```json
{
  "fields": [
    {
      "type": "vector",
      "path": "embedding",
      "numDimensions": 384, // Adjust this based on your embedding model dimensions
      "similarity": "cosine"
    }
  ]
}
```

7. Click "Create Index"

## Step 6: Update Your Environment Variables

1. Create a `.env.local` file in your project root
2. Add your MongoDB connection string:

```

```

3. Save the file

## Step 7: Testing Your Connection

1. Run your application with `npm run dev`
2. Try uploading a document through the interface
3. Check your MongoDB Atlas database to verify the document was stored correctly

## Additional Atlas Setup for Production

For production environments, consider:

1. **IP Allowlisting**: Restrict access to specific IP addresses
2. **Network Peering**: Set up VPC peering if deploying to the same cloud provider
3. **Backup**: Configure regular backups of your data
4. **Scaling**: Monitor performance and upgrade your cluster tier as needed

Your MongoDB Atlas setup with vector search is now ready for the StudyBuddy AI application! 