# NHL Player Valuation System: Using Performance Metrics to Understand and Predict Player Salary

## Group Members: Michael Kuby, Sangmun Kim, Yuyang Chen, and Haichen Sun

## How to use
The project herin is laid on in sequential order and should be fairly straightforward to navigate. There are two main directories: Data and Script.

**Data** is conceptually broken into a data lake and a data warehouse. Scraped data is put into the lake, then after furthe processing, cleaning, and transformations, it is moved to the warehouse.

**Script** is laid out sequentially. If you so desire, starting with Script/1_Obtain_X/step1_.py you will be able to scrape performance metrics from naturalstattrick.com, then from Script/2_Obtain_Y/step1_.py scrape salary data from capfriendly.com, and so on and so forth. 

For simplicity, none of the .py files require any parameters, but be warned: you will scrape a healthy amount of data if you choose to run.

Early sets of operations entail .py files, whereas most of the EDA, data science, and ML tasks make use of .ipynb files.

**6_ModelTraining** Houses the model training and analysis sections of the project. It includes some notebooks that are not used in the final project. During training we were optimistic that we may be able to use 2 models instead of three, so there exists models and analysis for training a Forward Model, but we do not use this for inference.

The directory **7_CreateFinalData** is used primarily to combine the predictions made by the various models and ready the data for deployment on the front end.

That's all. Enjoy!