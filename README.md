# SEGG - Step Function Express Graph Generator

SEGG gives visibility to express each execution of a AWS Step Function Express Workflows making it much easier to build and troubleshoot. This tool will help you see the execution visually similar to the execution graph of a Step Function Standard Worflow provided by AWS, and build applications at a much faster rate.
​

## Getting Started

Click here [SEGG](https://segg.antstack.com/) to navigate to the SEGG Web Portal.
​

### Step 1: Register and Link AWS Account

Register by filling the basic information. On successful registration you will be pointed towards the '1 Click Deploy' that will create an IAM Role in your account for SEGG to access to Step Function Definition and Cloudwatch Logs. You can view the Cloudformation and the role it creates over [here](https://github.com/antstackio/SEGG/blob/main/be/iam-one-click-template.yaml)
​

- #### Security Note
  SEGG assumes the role created to access the Step function definition and the logs, SEGG does not store any session or step function related information.
  ​

### Step 2: Enter Linked AWS Account Information

After registering and linking the AWS account, the user will be prompted to enter the AWS Account ID, AWS Region and IAM Role Name ( The role created in Step 1 ). The user can use the details to access the application.

### Try SEGG

Enter the information given below in Step 2 of SEGG portal to access the demo application:
|Key| Value |  
|--|--|  
|AWS Account Id|960351580303|
|Region|ap-south-1|
|IAM Role Name|antstack_stepfunction_readonly|
​

## Libraries

| Name                | Function                                                                                                       |
| ------------------- | -------------------------------------------------------------------------------------------------------------- |
| airtable            | Used for storing registered users.                                                                             |
| antd                | Component library.                                                                                             |
| react-flow-renderer | Used to generate graphs.                                                                                       |
| dagre               | Used for generating the co ordinates for graph.                                                                |
| react               | Help build user interfaces.                                                                                    |
| react-cookie        | Load and save cookies with React.                                                                              |
| react-dom           | Package that provides DOM specific methods.                                                                    |
| react-router-dom    | Package contains bindings for using React Router in web applications.                                          |
| react-scripts       | Simply scripts to run the tools required to transform React JSX syntax into plain JavaScript programmatically. |
| web-vitals          | Modular library for measuring all the Web Vitals metrics on real users.                                        |
