# NHL Player Valuation System: Using Performance Metrics to Understand and Predict Player Salary

## Group Members: Michael Kuby, Sangmun Kim, Yuyang Chen, and Haichen Sun

## How to use
The project herin is laid on in sequential order and should be fairly straightforward to navigate. Since the required data is already included in the repo, analysis begins in directory Script/5_ExploratoryDataAnalysis. 

There are two main directories: Data and Script.

### Data
**Data** is conceptually broken into a data lake and a data warehouse. Scraped data is put into the lake, then after furthe processing, cleaning, and transformations, it is moved to the warehouse.

### Script
**Script** is laid out sequentially: Step1, Step2, ..., Step7.

If you so desire, starting with Script/1_Obtain_X/step1_.py you will be able to scrape performance metrics from naturalstattrick.com, then from Script/2_Obtain_Y/step1_.py scrape salary data from capfriendly.com, and so on and so forth. 

For simplicity, none of the .py files require any parameters, but be warned: you will scrape a healthy amount of data if you choose to run them.

Early sets of operations that undertake scraping and initial ETL tasks entail .py files, whereas the EDA, data science, and ML tasks make use of .ipynb notbeooks.

#### 1_Obtain_X
Here we scrape naturalstattrick.com to obtain our X values

#### 2_Obtain_Y
Here we scrape capfriendly.com to ovtain our Y values

#### 3_Transform
Here we go over all of the data that we have scraped. Each notebook seeks to clean, transform and then save the file to our warehouse.

#### 4_EntityResolution
This step involves the merger of our data from two distinct sources.

#### 5_ExploratoryDataAnalysis
This step involves seeking to understand what features may make sense to use in model training.

#### 6_ModelTraining 
Houses the model training and analysis sections of the project. It includes some notebooks that are not used in the final project. During training we were optimistic that we may be able to use 2 models instead of 3, so there exists models and analysis for training a Forward Model, but we abandoned this approach in favour of a 3 model system.

#### 7_CreateFinalData
Is used to combine the predictions made by the 3 models with the data formed prior ML training, which is then used for deployment on the front end.

That's all. Enjoy!