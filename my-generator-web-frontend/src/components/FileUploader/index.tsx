import { uploadFileUsingPost } from '@/services/backend/fileController';
import { InboxOutlined } from '@ant-design/icons';
import { message, UploadFile, UploadProps } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import React, { useState } from 'react';

//自定义类型模板，规定别人使用我们这个组件时，可以传哪些参数、每个参数是什么类型
interface Props {
  biz: string;
  //规定onChange需要传入fileList，不返回内容
  //？不传入onChange也行
  onChange?: (fileList: UploadFile[]) => void;
  value?: UploadFile[];
  description?: string;
}

/**
 * 文件上传组件
 * @constructor
 */
//React.FC函数组件，<Props>表示要遵守props的规则
//写在组件内部是因为使用到了需要动态传入的变量
//props由使用这个组件的父组件传入
const FileUploader: React.FC<Props> = (props) => {
  const { biz, value, description, onChange } = props;
  //useState在哪个组件里定义的，只要发生改变，这个组件就会重新渲染
  const [loading, setLoading] = useState(false);

  // 定义对象uploadProps，：类型，限制类型必须是这个
  //用于传给拖拽区域Dragger
  //UploadProps，TS类型，antd上传组件支持的所有属性的类型定义，用以规范参数
  // @ts-ignore
  const uploadProps: UploadProps = {
    //传给后端的文件参数名，后端接收文件的参数名就是这个file，名字不对拿不到文件
    name: 'file',
    //文件的展示样式
    listType: 'text',
    //是否多文件上传
    multiple: false,
    //最多上传几个
    maxCount: 1,
    //绑定文件列表，来自父组件传的value
    fileList: value,
    //loading时禁用
    disabled: loading,
    //文件变动回调，给Dragger用的
    //有onChange函数才执行，把最新文件列表抛给父组件/Form
    onChange: ({ fileList }) => {//（{}）参数解构，antd传的对象里面拿出fileList
      onChange?.(fileList);//父组件没有传onChange时跳过此步骤（调用父组件的onChange）
      //上面是受控的用法，通过回调把fileList给外层组件
      //然后外层组件重新渲染把数据重新给FileUploader的Props里的这个value
      //然后这个value还是组成Dragger参数的一部分，参数一变，Dragger立刻重新渲染

      //下面是另一种受控，如果要非受控需要Dragger自己拿到FileList立刻自己保管数据重新渲染
      //const TestPage = () => {
      //   // 自己手动存文件列表，替代Form的state
      //   const [fileList, setFileList] = useState<UploadFile[]>([]);
      //
      //   return (
      //     <div>
      //       <FileUploader
      //         biz="user_avatar"
      //         value={fileList}
      //         onChange={(newList) => setFileList(newList)}
      //         description="直接单独使用，不用Form"
      //       />
      //       <div>当前选中文件：{fileList[0]?.name}</div>
      //     </div>
      //   )
      // }
    },
    //antd钩子，一旦写了这个将不用antd自己发请求上传文件了，上传功能的代码自己写
    //fileObj是antd传给我们的对象，里面包含选中文件信息，any不限制此内容的类型
    //fileObj代表当前正在上传的这个文件，只在上传的一瞬间存在
    customRequest: async (fileObj: any) => {
      setLoading(true);
      try {
        //调用后端接口
        const res = await uploadFileUsingPost(
          //传入业务类型
          {
            biz,
          },
          //request配置（headers这些）
          {},
          //二进制文件本体
          fileObj.file,
        );
        //告诉antd上传成功，更改文件状态为done
        //算是个回调函数，把传入的值赋值给UploadFile的response属性
        fileObj.onSuccess(res.data);
      } catch (e: any) {
        message.error('上传失败，' + e.message);
        fileObj.onError(e);
      }
      setLoading(false);
    },
  };

  //Dragger是FileUploader内部的“黑盒子零件”
  return (
    //渲染拖拽上传区域，把所有uploadProps属性透传给Dragger
    <Dragger {...uploadProps}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">点击或拖拽文件上传</p>
      <p className="ant-upload-hint">{description}</p>
    </Dragger>
  );
};

export default FileUploader;

