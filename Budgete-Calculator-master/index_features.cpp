#include<mpi.h>
#include<stdio.h>
#include<stdlib.h>


int main()
{	
	MPI_Init(NULL,NULL);
	
	int world_rank;
	MPI_Comm_rank(MPI_COMM_WORLD,&world_rank);
	int world_size;
	MPI_Comm_size(MPI_COMM_WORLD,&world_size);

	int *a=(int*)malloc(world_size*2*sizeof(int)),*b=(int*)malloc(2*sizeof(int));

	MPI_Group existing_group,new_group;
	int ierr;
	MPI_Comm_group(MPI_COMM_WORLD,&existing_group);
	// This creates a group called existing group that conatins all members of MPI_COMM_WORLD
	
	int *temp=(int*)malloc((world_size-1)*sizeof(int));
	for(int i=0;i<world_size-1;i++)
		temp[i]=i;

	MPI_Group_incl(existing_group,world_size-1,temp,&new_group);

	MPI_Comm NEW_COMM;

	MPI_Comm_create(MPI_COMM_WORLD,new_group,&NEW_COMM);

	if(world_rank==0)
	{
		printf("\nEnter elements of array: ");
		for(int i=0;i<world_size*2;i++)
			scanf("%d",&a[i]);
	}
	
	for(int j=0;j<world_size*2;j++)
	{
		if((j%2!=0)&&(world_rank!=world_size-1))
		{
			//copy a array elements except first into c array
			int *c=(int*)malloc(sizeof(int)*(world_size+world_size-1));
			for(int i=0;i<world_size*2-1;i++)
				c[i]=a[i+1];

			MPI_Scatter(c,2,MPI_INT,b,2,MPI_INT,0,NEW_COMM);
			MPI_Barrier(NEW_COMM);
						
			if(b[0]<b[1])
			{
				int t=b[0];
				b[0]=b[1];
				b[1]=t;
			}

			MPI_Gather(b,2,MPI_INT,c,2,MPI_INT,0,NEW_COMM);
			MPI_Barrier(NEW_COMM);

			//copy c array into a 
			for(int i=1;i<world_size*2;i++)
				a[i]=c[i-1];
		}
		
		if(j%2==0)
		{
			MPI_Scatter(a,2,MPI_INT,b,2,MPI_INT,0,MPI_COMM_WORLD);
			MPI_Barrier(MPI_COMM_WORLD);

			if(b[0]<b[1])
			{
				int t=b[0];
				b[0]=b[1];
				b[1]=t;
			}

			MPI_Gather(b,2,MPI_INT,a,2,MPI_INT,0,MPI_COMM_WORLD);
			MPI_Barrier(MPI_COMM_WORLD);
		}
	}
	
	if(world_rank==0)
	{
		printf("\nSorted array: ");
		for(int i=0;i<world_size*2;i++)
			printf("%d ",a[i]);
	}

	MPI_Finalize();
	return 0;
}
