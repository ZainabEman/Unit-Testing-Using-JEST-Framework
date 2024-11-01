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

	int *a=(int*)malloc(sizeof(int)*world_size);

	if(world_rank==0)
	{
		printf("\nEnter array elements: ");
		for(int i=0;i<world_size;i++)
			scanf("%d",&a[i]);
	}

	int b,c=0;

	MPI_Scatter(a,1,MPI_INT,&b,1,MPI_INT,0,MPI_COMM_WORLD);
	
	MPI_Scan(&b,&c,1,MPI_INT,MPI_SUM,MPI_COMM_WORLD);

	printf("%d ",c);
	MPI_Finalize();
	free(a);

	return 0;
}
