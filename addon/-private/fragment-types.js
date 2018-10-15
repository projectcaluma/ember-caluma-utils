export default {
  __schema: {
    types: [
      {
        kind: "INTERFACE",
        name: "Node",
        possibleTypes: [
          {
            name: "Workflow"
          },
          {
            name: "Task"
          },
          {
            name: "Form"
          },
          {
            name: "Flow"
          },
          {
            name: "Case"
          },
          {
            name: "Document"
          },
          {
            name: "WorkItem"
          },
          {
            name: "Option"
          },
          {
            name: "TextQuestion"
          },
          {
            name: "RadioQuestion"
          },
          {
            name: "CheckboxQuestion"
          },
          {
            name: "TextareaQuestion"
          },
          {
            name: "FloatQuestion"
          },
          {
            name: "IntegerQuestion"
          },
          {
            name: "StringAnswer"
          },
          {
            name: "ListAnswer"
          },
          {
            name: "IntegerAnswer"
          },
          {
            name: "FloatAnswer"
          }
        ]
      },
      {
        kind: "INTERFACE",
        name: "Question",
        possibleTypes: [
          {
            name: "TextQuestion"
          },
          {
            name: "RadioQuestion"
          },
          {
            name: "CheckboxQuestion"
          },
          {
            name: "TextareaQuestion"
          },
          {
            name: "FloatQuestion"
          },
          {
            name: "IntegerQuestion"
          }
        ]
      },
      {
        kind: "INTERFACE",
        name: "Answer",
        possibleTypes: [
          {
            name: "StringAnswer"
          },
          {
            name: "ListAnswer"
          },
          {
            name: "IntegerAnswer"
          },
          {
            name: "FloatAnswer"
          }
        ]
      }
    ]
  }
};
