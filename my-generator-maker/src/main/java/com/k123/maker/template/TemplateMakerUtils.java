package com.k123.maker.template;

import cn.hutool.core.util.StrUtil;
import com.k123.maker.meta.Meta;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * 模板制作工具类
 */
public class TemplateMakerUtils {

    /**
     * 从未分组的文件中移除组内的模板文件配置
     * @param fileInfoList
     * @return
     */
    public static List<Meta.FileConfig.FileInfo> removeGroupFilesFromRoot(List<Meta.FileConfig.FileInfo> fileInfoList) {

        //先获取所有分组
        List<Meta.FileConfig.FileInfo> groupFileInfoList = fileInfoList.stream()
                .filter(fileInfo -> StrUtil.isNotBlank(fileInfo.getGroupKey()))
                .collect(Collectors.toList());
        //获取分组下的文件列表（需要把每个对象中的file列表合并）
        List<Meta.FileConfig.FileInfo> groupInnerFileInfoList = groupFileInfoList.stream()
                .flatMap(fileInfo -> fileInfo.getFiles().stream())
                .collect(Collectors.toList());
        //获取所有分组内文件的输出路径集合（outputPath是依据）
        Set<String> fileInputPathSet = groupInnerFileInfoList.stream()
                //map一一映射转换
                .map(Meta.FileConfig.FileInfo::getOutputPath)
                .collect(Collectors.toSet());
        //检查未分组的文件里是否有配置的输出路径在集合中存在
        //存在则移除


        //这些文件如果outputPath不在set中则保留
        return fileInfoList.stream()
                //拿出在分组外的文件
                .filter(fileInfo -> !fileInputPathSet.contains(fileInfo.getOutputPath()))
                .collect(Collectors.toList());
    }
}
