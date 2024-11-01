#include<mpi.h>
#include<stdlib.h>
#include<stdio.h>

int main()
{
	MPI_Init(NULL,NULL);

	int world_rank;
	MPI_Comm_rank(MPI_COMM_WORLD,&world_rank);
	int world_size;
	MPI_Comm_size(MPI_COMM_WORLD,&world_size);

	int X=10;

	int *x=(int*)malloc(world_size*sizeof(int));
	int *y=(int*)malloc(world_size*sizeof(int));

	if(world_rank==0)
	{
		// printf("\nEnter values of X and Y: ");
		// scanf("%d %d",&X,&Y);

		printf("\nEnter values of x: ");
		for(int i=0;i<world_size;i++)
			scanf("%d",&x[i]);

		printf("\nEnter values of y: ");
		for(int i=0;i<world_size;i++)
			scanf("%d",&y[i]);
		
	}

	MPI_Bcast(x,world_size,MPI_INT,0,MPI_COMM_WORLD);
	MPI_Bcast(y,world_size,MPI_INT,0,MPI_COMM_WORLD);

	float t1=1.0,t2=1.0,t3,s;
	for(int i=0;i<world_size;i++)
		if(i!=world_rank)
			t1*=(X-x[i]);

	for(int i=0;i<world_size;i++)
		if(i!=world_rank)
			t2*=(x[world_rank]-x[i]);

	t3=(t1/t2)*(float)y[world_rank];

	MPI_Reduce(&t3,&s,1,MPI_FLOAT,MPI_SUM,0,MPI_COMM_WORLD);

	if(world_rank==0)
		printf("Answer: %f",s);

	MPI_Finalize;
	return 0;
}
