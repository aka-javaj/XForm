import React, { FC } from 'react'
import { Button, Space, Tooltip } from 'antd'
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  CopyOutlined,
  BlockOutlined,
  UpOutlined,
  DownOutlined,
  UndoOutlined,
  RedoOutlined,
} from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import {
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
  moveComponent,
} from '../../../store/componentsReducer'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'

const EditToolbar: FC = () => {
  const dispatch = useDispatch()
  const { selectedId, componentList, selectedComponent, copiedComponent } = useGetComponentInfo()
  const { isLocked } = selectedComponent || {}
  const length = componentList.length
  const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId)
  const isFirst = selectedIndex <= 0 // 第一个
  const isLast = selectedIndex + 1 >= length // 最后一个

  // Delete组件
  function handleDelete() {
    dispatch(removeSelectedComponent())
  }

  // Hide组件
  function handleHidden() {
    dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }))
  }

  // Lock组件
  function handleLock() {
    dispatch(toggleComponentLocked({ fe_id: selectedId }))
  }

  // Copy
  function copy() {
    dispatch(copySelectedComponent())
  }

  // Paste
  function paste() {
    dispatch(pasteCopiedComponent())
  }

  // Move Up
  function moveUp() {
    if (isFirst) return
    dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex - 1 }))
  }

  // Move Down
  function moveDown() {
    if (isLast) return
    dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex + 1 }))
  }

  // Undo
  function undo() {
    dispatch(UndoActionCreators.undo())
  }

  // Recover
  function redo() {
    dispatch(UndoActionCreators.redo())
  }

  return (
    <Space>
      <Tooltip title="Delete">
        <Button shape="circle" icon={<DeleteOutlined />} onClick={handleDelete}></Button>
      </Tooltip>
      <Tooltip title="Hide">
        <Button shape="circle" icon={<EyeInvisibleOutlined />} onClick={handleHidden}></Button>
      </Tooltip>
      <Tooltip title="Lock">
        <Button
          shape="circle"
          icon={<LockOutlined />}
          onClick={handleLock}
          type={isLocked ? 'primary' : 'default'}
        ></Button>
      </Tooltip>
      <Tooltip title="Copy">
        <Button shape="circle" icon={<CopyOutlined />} onClick={copy}></Button>
      </Tooltip>
      <Tooltip title="Paste">
        <Button
          shape="circle"
          icon={<BlockOutlined />}
          onClick={paste}
          disabled={copiedComponent == null}
        ></Button>
      </Tooltip>
      <Tooltip title="Move Up">
        <Button shape="circle" icon={<UpOutlined />} onClick={moveUp} disabled={isFirst}></Button>
      </Tooltip>
      <Tooltip title="Move Down">
        <Button
          shape="circle"
          icon={<DownOutlined />}
          onClick={moveDown}
          disabled={isLast}
        ></Button>
      </Tooltip>
      <Tooltip title="Undo">
        <Button shape="circle" icon={<UndoOutlined />} onClick={undo}></Button>
      </Tooltip>
      <Tooltip title="Recover">
        <Button shape="circle" icon={<RedoOutlined />} onClick={redo}></Button>
      </Tooltip>
    </Space>
  )
}

export default EditToolbar
