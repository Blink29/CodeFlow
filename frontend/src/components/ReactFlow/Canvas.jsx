import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "reactflow";
import { MarkerType } from "reactflow";

import CustomNode from "./CustomNode";

import "reactflow/dist/style.css";
import "./overview.css";
import axios from "../../axios";

import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const nodeTypes = {
  custom: CustomNode,
};

const minimapStyle = {
  height: 120,
};

const onInit = (reactFlowInstance) =>
  console.log("flow loaded:", reactFlowInstance);

// const parsedData = [
//   {
//     id: 1,
//     file_name: "setup.py",
//     file_path:
//       "https://raw.githubusercontent.com/allrod5/pycollect/master/setup.py",
//     class_name: "under no class",
//     function_name: "read",
//     arguments: [],
//     code: 'def read(*names, **kwargs):\n    with io.open(\n        join(dirname(__file__), *names), encoding=kwargs.get("encoding", "utf8")\n    ) as fh:\n        return fh.read()',
//     functions_called: [],
//     function_rating: 0,
//   },
//   {
//     id: 2,
//     file_name: "module_finder.py",
//     file_path:
//       "https://raw.githubusercontent.com/allrod5/pycollect/master/src/pycollect/module_finder.py",
//     class_name: "under no class",
//     function_name: "path_is_in_pythonpath",
//     arguments: ["path"],
//     code: "def path_is_in_pythonpath(path):\n    path = normcase(path)\n    return any(normcase(sp) == path for sp in sys.path)",
//     functions_called: [],
//     function_rating: 0.14285714285714285,
//   },
//   {
//     id: 3,
//     file_name: "module_finder.py",
//     file_path:
//       "https://raw.githubusercontent.com/allrod5/pycollect/master/src/pycollect/module_finder.py",
//     class_name: "under no class",
//     function_name: "find_module_name",
//     arguments: ["filepath", "innermost"],
//     code: 'def find_module_name(\n    filepath: Union[DirEntry, str, PathLike], innermost: bool = False\n) -> Optional[str]:\n    """\n    Utility function to find the Python module name of a python file.\n\n    :param filepath:\n        The absolute filepath as a DirEntry object, path string or PathLike object.\n    :param innermost:\n        (default: False) By default the outermost possible module name is returned.\n        When this flag is set to True, the first found, innermost possible module name\n        is then returned without further looking.\n    :return:\n        The module name string or None if no module was found for the specified\n        filepath.\n    """\n    if isinstance(filepath, DirEntry):\n        filepath = filepath.path\n\n    valid_module_name = None\n    module_name = splitext(basename(filepath))[0]\n    full_path = Path(dirname(filepath))\n    at_root = False\n    while not at_root:\n        if path_is_in_pythonpath(full_path):\n            if innermost:\n                return module_name\n            else:\n                valid_module_name = module_name\n        module_name = f"{basename(full_path)}.{module_name}"\n        at_root = full_path.parent == full_path.parent.parent\n        full_path = Path(full_path.parent)\n    return valid_module_name',
//     functions_called: [2],
//     function_rating: 1.0,
//   },
//   {
//     id: 4,
//     file_name: "module_finder_integration_test.py",
//     file_path:
//       "https://raw.githubusercontent.com/allrod5/pycollect/master/tests/integration/module_finder_integration_test.py",
//     class_name: "under no class",
//     function_name: "test_find_outermost_module_name",
//     arguments: [],
//     code: 'def test_find_outermost_module_name():\n    """\n    This test intents to ensure that the utility function `find_module_name` will\n    find the correct outermost module name for a given filepath by default\n    """\n    # given\n    filepath = foo.__file__\n    expected_module_name = "tests.resources.example_module.foo.foo"\n\n    # when\n    module_name = find_module_name(filepath)\n\n    # then\n    assert module_name == expected_module_name',
//     functions_called: [3, 15],
//     function_rating: 0.14285714285714285,
//   },
//   {
//     id: 5,
//     file_name: "module_finder_integration_test.py",
//     file_path:
//       "https://raw.githubusercontent.com/allrod5/pycollect/master/tests/integration/module_finder_integration_test.py",
//     class_name: "under no class",
//     function_name: "test_find_innermost_module_name",
//     arguments: [],
//     code: 'def test_find_innermost_module_name():\n    """\n    This test intents to ensure that the utility function `find_module_name` will\n    find the correct innermost module name for a given filepath when parameter\n    `innermost=True`\n    """\n    # given\n    filepath = foo.__file__\n    expected_module_name = "example_module.foo.foo"\n\n    # when\n    module_name = find_module_name(filepath, innermost=True)\n\n    # then\n    assert module_name == expected_module_name',
//     functions_called: [3, 16],
//     function_rating: 0.14285714285714285,
//   },
//   {
//     id: 6,
//     file_name: "module_finder_integration_test.py",
//     file_path:
//       "https://raw.githubusercontent.com/allrod5/pycollect/master/tests/integration/module_finder_integration_test.py",
//     class_name: "under no class",
//     function_name: "test_find_nonexistent_module_name",
//     arguments: [],
//     code: 'def test_find_nonexistent_module_name():\n    """\n    This test intents to ensure that the utility function `find_module_name` will\n    return None for files it can not attribute a module name\n    """\n    # given\n    root_dir = "usr" if os.name != "nt" else "C:"\n    filepath = os.path.join(os.sep, root_dir + os.sep, "random", "path", "script.py")\n\n    # when\n    module_name = find_module_name(filepath)\n\n    # then\n    assert module_name is None',
//     functions_called: [3, 17],
//     function_rating: 0.14285714285714285,
//   },
//   {
//     id: 7,
//     file_name: "python_file_collector_integration_test.py",
//     file_path:
//       "https://raw.githubusercontent.com/allrod5/pycollect/master/tests/integration/python_file_collector_integration_test.py",
//     class_name: "under no class",
//     function_name: "search_path",
//     arguments: [],
//     code: 'def search_path() -> str:\n    return os.path.join(\n        re.sub(\n            "{0}\\\\{1}(?:.(?!{0}\\\\{1}))+$".format("integration", os.sep), "", __file__\n        ),\n        "resources",\n        "example_module",\n    )',
//     functions_called: [],
//     function_rating: 0,
//   },
//   {
//     id: 8,
//     file_name: "python_file_collector_integration_test.py",
//     file_path:
//       "https://raw.githubusercontent.com/allrod5/pycollect/master/tests/integration/python_file_collector_integration_test.py",
//     class_name: "under no class",
//     function_name: "test_example_module_with_default_configurations",
//     arguments: ["enable_regex_patterns", "expected_files", "search_path"],
//     code: "def test_example_module_with_default_configurations(\n    enable_regex_patterns: bool, expected_files: List[List[str]], search_path: str\n):\n    # given\n    python_file_collector = PythonFileCollector(\n        use_regex_patterns=enable_regex_patterns\n    )\n    expected_findings = {\n        os.path.join(search_path, *expected_file) for expected_file in expected_files\n    }\n\n    # when\n    collected_files = python_file_collector.collect(search_path=search_path)\n\n    # then\n    assert collected_files\n    collected_filepaths = {file.path for file in collected_files}\n    assert collected_filepaths == expected_findings",
//     functions_called: [],
//     function_rating: 0,
//   },
//   {
//     id: 9,
//     file_name: "python_file_collector_integration_test.py",
//     file_path:
//       "https://raw.githubusercontent.com/allrod5/pycollect/master/tests/integration/python_file_collector_integration_test.py",
//     class_name: "under no class",
//     function_name:
//       "test_example_module_with_additional_file_exclusion_patterns",
//     arguments: [
//       "enable_regex_patterns",
//       "additional_file_exclusion_patterns",
//       "expected_files",
//       "search_path",
//     ],
//     code: "def test_example_module_with_additional_file_exclusion_patterns(\n    enable_regex_patterns: bool,\n    additional_file_exclusion_patterns: List[str],\n    expected_files: List[List[str]],\n    search_path: str,\n):\n    # given\n    python_file_collector = PythonFileCollector(\n        use_regex_patterns=enable_regex_patterns,\n        additional_file_exclusion_patterns=additional_file_exclusion_patterns,\n    )\n    expected_findings = {\n        os.path.join(search_path, *expected_file) for expected_file in expected_files\n    }\n\n    # when\n    collected_files = python_file_collector.collect(search_path=search_path)\n\n    # then\n    assert collected_files\n    collected_filepaths = {file.path for file in collected_files}\n    assert collected_filepaths == expected_findings",
//     functions_called: [],
//     function_rating: 0,
//   },
//   {
//     id: 10,
//     file_name: "python_file_collector_integration_test.py",
//     file_path:
//       "https://raw.githubusercontent.com/allrod5/pycollect/master/tests/integration/python_file_collector_integration_test.py",
//     class_name: "under no class",
//     function_name: "test_example_module_with_additional_dir_exclusion_patterns",
//     arguments: [
//       "enable_regex_patterns",
//       "additional_dir_exclusion_patterns",
//       "expected_files",
//       "search_path",
//     ],
//     code: "def test_example_module_with_additional_dir_exclusion_patterns(\n    enable_regex_patterns: bool,\n    additional_dir_exclusion_patterns: List[str],\n    expected_files: List[List[str]],\n    search_path: str,\n):\n    # given\n    python_file_collector = PythonFileCollector(\n        use_regex_patterns=enable_regex_patterns,\n        additional_dir_exclusion_patterns=additional_dir_exclusion_patterns,\n    )\n    expected_findings = {\n        os.path.join(search_path, *expected_file) for expected_file in expected_files\n    }\n\n    # when\n    collected_files = python_file_collector.collect(search_path=search_path)\n\n    # then\n    assert collected_files\n    collected_filepaths = {file.path for file in collected_files}\n    assert collected_filepaths == expected_findings",
//     functions_called: [],
//     function_rating: 0,
//   },
//   {
//     id: 11,
//     file_name: "windows_case_insensitivity_regression_test.py",
//     file_path:
//       "https://raw.githubusercontent.com/allrod5/pycollect/master/tests/regression/windows_case_insensitivity_regression_test.py",
//     class_name: "under no class",
//     function_name: "test_windows_case_insensitivity",
//     arguments: ["mocker"],
//     code: 'def test_windows_case_insensitivity(mocker: MockFixture):\n    # given\n    mocked_pythonpath = [Path(r"d:\\a\\package")]\n    mocker.patch("pycollect.module_finder.sys.path", mocked_pythonpath)\n    filepath = Path(r"D:\\a\\package\\module.py")\n    expected_module_name = "module"\n\n    # when\n    module_name = find_module_name(filepath)\n\n    # then\n    assert module_name == expected_module_name',
//     functions_called: [3],
//     function_rating: 0,
//   },
//   {
//     id: 12,
//     file_name: "module_finder_unit_test.py",
//     file_path:
//       "https://raw.githubusercontent.com/allrod5/pycollect/master/tests/unit/module_finder_unit_test.py",
//     class_name: "under no class",
//     function_name: "build_path",
//     arguments: [],
//     code: 'def build_path(*paths: str) -> str:\n    root_dir = "usr" if os.name != "nt" else "C:"\n    return os.path.join(os.sep, root_dir + os.sep, *paths)',
//     functions_called: [],
//     function_rating: 0.42857142857142855,
//   },
//   {
//     id: 13,
//     file_name: "module_finder_unit_test.py",
//     file_path:
//       "https://raw.githubusercontent.com/allrod5/pycollect/master/tests/unit/module_finder_unit_test.py",
//     class_name: "under no class",
//     function_name: "join_paths",
//     arguments: [],
//     code: "def join_paths(*paths: str) -> str:\n    return os.path.join(*paths)",
//     functions_called: [],
//     function_rating: 0.2857142857142857,
//   },
//   {
//     id: 14,
//     file_name: "module_finder_unit_test.py",
//     file_path:
//       "https://raw.githubusercontent.com/allrod5/pycollect/master/tests/unit/module_finder_unit_test.py",
//     class_name: "under no class",
//     function_name: "parent_path",
//     arguments: ["path"],
//     code: "def parent_path(path: str) -> str:\n    return str(Path(path).parent)",
//     functions_called: [],
//     function_rating: 0.2857142857142857,
//   },
//   {
//     id: 15,
//     file_name: "module_finder_unit_test.py",
//     file_path:
//       "https://raw.githubusercontent.com/allrod5/pycollect/master/tests/unit/module_finder_unit_test.py",
//     class_name: "under no class",
//     function_name: "test_find_outermost_module_name",
//     arguments: [],
//     code: 'def test_find_outermost_module_name():\n    """\n    This test intents to ensure that the utility function `find_module_name` will\n    find the correct outermost module name for a given filepath by default\n    """\n    # given\n    package_path = build_path("test_find_outermost_module_name", "some_package")\n    inner_module_path = join_paths(package_path, "inner_module")\n    filepath = join_paths(inner_module_path, "foo", "bar.py")\n    sys.path.append(parent_path(package_path))\n    sys.path.append(parent_path(inner_module_path))\n    expected_module_name = "some_package.inner_module.foo.bar"\n\n    # when\n    module_name = find_module_name(filepath)\n\n    # then\n    assert module_name == expected_module_name',
//     functions_called: [3, 4, 12, 13, 14],
//     function_rating: 0.14285714285714285,
//   },
//   {
//     id: 16,
//     file_name: "module_finder_unit_test.py",
//     file_path:
//       "https://raw.githubusercontent.com/allrod5/pycollect/master/tests/unit/module_finder_unit_test.py",
//     class_name: "under no class",
//     function_name: "test_find_innermost_module_name",
//     arguments: [],
//     code: 'def test_find_innermost_module_name():\n    """\n    This test intents to ensure that the utility function `find_module_name` will\n    find the correct innermost module name for a given filepath when parameter\n    `innermost=True`\n    """\n    # given\n    package_path = build_path("test_find_outermost_module_name", "some_package")\n    inner_module_path = join_paths(package_path, "inner_module")\n    filepath = join_paths(inner_module_path, "foo", "bar.py")\n    sys.path.append(parent_path(package_path))\n    sys.path.append(parent_path(inner_module_path))\n    expected_module_name = "inner_module.foo.bar"\n\n    # when\n    module_name = find_module_name(filepath, innermost=True)\n\n    # then\n    assert module_name == expected_module_name',
//     functions_called: [3, 5, 12, 13, 14],
//     function_rating: 0.14285714285714285,
//   },
//   {
//     id: 17,
//     file_name: "module_finder_unit_test.py",
//     file_path:
//       "https://raw.githubusercontent.com/allrod5/pycollect/master/tests/unit/module_finder_unit_test.py",
//     class_name: "under no class",
//     function_name: "test_find_nonexistent_module_name",
//     arguments: [],
//     code: 'def test_find_nonexistent_module_name():\n    """\n    This test intents to ensure that the utility function `find_module_name` will\n    return None for files it can not attribute a module name\n    """\n    # given\n    filepath = build_path("test_find_nonexistent_module_name", "bar.py")\n\n    # when\n    module_name = find_module_name(filepath)\n\n    # then\n    assert module_name is None',
//     functions_called: [3, 6, 12],
//     function_rating: 0.14285714285714285,
//   },
// ];

const Canvas = () => {
  const query = useQuery();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  const url = query.get("url");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/get_functions?url=${url}`);
        const parsedData = res.data;
        const sortedData = parsedData
          .slice()
          .sort((a, b) => b.function_rating - a.function_rating);

        const ratingMap = new Map();
        const yCoordinatesMap = new Map();
        let currentX = 400;

        sortedData.forEach((node) => {
          if (!ratingMap.has(node.function_rating)) {
            ratingMap.set(node.function_rating, currentX);
            yCoordinatesMap.set(currentX, new Set());
            currentX -= 250;
          }

          const xCoordinate = ratingMap.get(node.function_rating);

          const yCoordinatesSet = yCoordinatesMap.get(xCoordinate);

          let yCoordinate =
            100 +
            (yCoordinatesSet.size % 2 === 0
              ? yCoordinatesSet.size * 80
              : -yCoordinatesSet.size * 80);

          while (yCoordinatesSet.has(yCoordinate)) {
            yCoordinate += yCoordinatesSet.size % 2 === 0 ? 80 : -80;
          }

          yCoordinatesSet.add(yCoordinate);

          node["X_coordinate"] = xCoordinate;
          node["Y_coordinate"] = yCoordinate;
        });

        const newNodes = parsedData.map((node) => ({
          id: node.id.toString(),
          type: "custom",
          data: {
            label: node.function_name,
            name: node.function_name,
            file_name: node.file_name,
            file_path: node.file_path,
            Id: node.id,
            code: node.code,
            class_name: node.class_name,
            description: "[Code Description]",
          },
          position: { x: node.X_coordinate, y: node.Y_coordinate },
        }));

        const newEdges = [];
        parsedData.forEach((node) => {
          node.functions_called.forEach((called) => {
            newEdges.push({
              id: node.id.toString() + called.toString(),
              source: node.id.toString(),
              target: called.toString(),
              animated: true,
              markerEnd: {
                type: MarkerType.ArrowClosed,
              },
            });
          });
        });

        setNodes(newNodes);
        setEdges(newEdges);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const onNodeClick = (event, node) => {
    const nodeId = node.id;
    console.log(nodeId);
    const updatedEdges = edges.map((edge) => {
      if (edge.source === nodeId || edge.target === nodeId) {
        return {
          ...edge,
          style: {
            strokeWidth: 2,
            stroke: "#FF0072",
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: "#FF0072",
          },
        };
      }
      return edge;
    });
    setEdges(updatedEdges);
  };

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onInit={onInit}
      fitView
      attributionPosition="top-right"
      onNodeClick={onNodeClick}

      nodeTypes={nodeTypes}
    >
      <MiniMap style={minimapStyle} zoomable pannable />
      <Controls />
      <Background color="#aaa" gap={16} />
    </ReactFlow>
  );
};

export default Canvas;
