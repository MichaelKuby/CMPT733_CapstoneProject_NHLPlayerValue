import sys
import os
assert sys.version_info >= (3, 5)  # make sure we have Python 3.5+
from pyspark.sql import SparkSession, functions as F, types


def main():
    directory = "../../Data/NHL_PlayerData_NaturalStatTrick"
    sub_directories = ['std', 'oi']

    dataframes = []
    for sub_directory in sub_directories:
        df = spark.read.csv(directory + '/' + sub_directory, header=True)
        dataframes.append(df)

    # Read the bio data directly from the csv
    bio_data = spark.read.csv('../../Data/NHL_PlayerData_NaturalStatTrick/bio/cleaned_bio.csv', header=True)
    dataframes.append(bio_data)

    # Join the dataframes
    df0cols = set(dataframes[0].columns)
    df1cols = set(dataframes[1].columns)
    df2cols = set(dataframes[2].columns)

    intersection_df0_df1 = df0cols.intersection(df1cols)
    joined = dataframes[0].join(dataframes[1], on=list(intersection_df0_df1), how='inner')

    intersection_joined_df2 = set(joined.columns).intersection(df2cols)
    joined = joined.join(dataframes[2], on=list(intersection_joined_df2), how='inner')

    destination = directory + '/parquet'
    if not os.path.exists(destination):
        os.makedirs(destination)

    joined.write.parquet(destination, mode='overwrite', partitionBy=['Year'])


# main logic starts here

if __name__ == '__main__':
    # Spark DataFrame set-up
    spark = SparkSession.builder.appName('example code').getOrCreate()
    assert spark.version >= '3.0'  # make sure we have Spark 3.0+
    spark.sparkContext.setLogLevel('WARN')
    sc = spark.sparkContext
    main()
