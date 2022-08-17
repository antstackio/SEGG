const processDefinition = (definition) => {
  // Init
  const finalJson = [];
  const boxIds = {
    Start: "0",
    End: "999",
  };
  const links = [];
  let ids = 1;
  let started;
  let loopLimit = 0;

  try {
    // Add Boxes
    const addBox = (id, label, backgroundColor) => {
      finalJson.push({
        id: id,
        data: { label: <span id={label}>{label}</span> },
        position: { x: 0, y: 0 },
        style: {
          backgroundColor: backgroundColor,
        },
      });
    };

    // Add box link between 2 items
    const addBoxLink = (source, destination, animated, color) => {
      if (!links.includes(source + "linking" + destination)) {
        // adding the "links" check to property name warning
        links.push(source + "linking" + destination);
        finalJson.push({
          id: source + "linking" + destination,
          source: boxIds[source],
          target: boxIds[destination],
          animated: animated,
          // type: "smoothstep",
          style: { stroke: color },
        });
      }
    };

    // loop function to iterate the definition
    const loopTheData = (data, dataKey, parallelStateEnd) => {
      // avoid recursive loop
      loopLimit++;
      if (loopLimit === 20) throw new Error({ message: "loop limit exceeded" });

      // add step, condition to skip addition of step
      if (!boxIds[dataKey]) {
        addBox(ids.toString(), dataKey);
        boxIds[dataKey] = ids.toString();
        ids += 1;
      }

      // Type conditions
      const continueConditions = ["Task", "Pass", "Wait"];
      const endConditions = ["Fail", "Succeed"];
      if (
        continueConditions.includes(data.Type) &&
        Object.keys(data).includes("Next")
      ) {
        // add step and step connection -- If "Next" then its a normal flow
        loopTheData(definition.States[data.Next], data.Next);
        addBoxLink(dataKey, data.Next, true, "black");
      } else if (data.Type === "Choice") {
        // add step and step connection - If "Choice" then it requires special handling
        data.Choices.forEach((e) => {
          loopTheData(definition.States[e.Next], e.Next);
          addBoxLink(dataKey, e.Next, true, "black");
        });
      } else if (data.Type === "Parallel") {
        // create the next box first
        loopTheData(definition.States[data.Next], data.Next);
        // repeat the entire loop for parallel type
        data.Branches.forEach((e) => {
          loopTheData(e.States[e.StartAt], e.StartAt, data.Next);
          addBoxLink(dataKey, e.StartAt, true, "black");
        });
      } else if (data.Type === "Map") {
        // create the next box first
        loopTheData(definition.States[data.Next], data.Next);
        // repeat the entire loop for map type
        loopTheData(
          data.Iterator.States[data.Iterator.StartAt],
          data.Iterator.StartAt,
          data.Next
        );
        addBoxLink(dataKey, data.Iterator.StartAt, true, "black");
      }

      // Catch Condition
      if (Object.keys(data).includes("Catch")) {
        data.Catch.forEach((e) => {
          loopTheData(definition.States[e.Next], e.Next);
          addBoxLink(dataKey, e.Next, false, "silver");
        });
      }

      // Condition to END
      if (
        Object.keys(data).includes("End") ||
        endConditions.includes(data.Type)
      ) {
        if (parallelStateEnd !== undefined) {
          addBoxLink(dataKey, parallelStateEnd, true, "black");
        } else addBoxLink(dataKey, "End", true, "black");
      }
    };

    // loop data at init
    if (!started) {
      started = true;
      loopTheData(definition.States[definition.StartAt], definition.StartAt);
      addBox("0", "Start", "#B8B8B8");
      addBox("999", "End", "#B8B8B8");
      addBoxLink("Start", definition.StartAt, true, "black");
    }
    return finalJson;
  } catch (error) {
    return "ERROR";
  }
};
export { processDefinition };
