package com.k123.maker.template;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.io.FileUtil;
import cn.hutool.core.io.file.FileAppender;
import com.k123.maker.template.enums.FileFilterRangeEnum;
import com.k123.maker.template.enums.FileFilterRuleEnum;
import com.k123.maker.template.model.FileFilterConfig;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class FileFilter {

    /**
     * 单个文件过滤
     * (职责单一，只传入一个文件和一组规则，判断是否满足)
     * @param fileFilterConfigList 过滤规则
     * @param file 单个文件
     * @return 是否保留
     */
    private static boolean doSingleFileFilter(List<FileFilterConfig> fileFilterConfigList, File file) {
        String fileName = file.getName();
        //此处防止一个bug（当一个true的文件生成了ftl之后
        //有机会再次进入这个逻辑，然后这个ftl结尾的文件有机会在此方法里返回true
        //最后生成一个配置[inputPath结尾是ftl的一个文件配置],导致重复
        if (fileName.endsWith(".ftl")) {
            return false;
        }

        String fileContent = FileUtil.readUtf8String(file);


        // 所有过滤器校验结束的结果
        boolean result = true;

        if (CollUtil.isEmpty(fileFilterConfigList)) {
            return true;
        }

        for (FileFilterConfig fileFilterConfig : fileFilterConfigList) {
            String range = fileFilterConfig.getRange();
            String rule = fileFilterConfig.getRule();
            String value = fileFilterConfig.getValue();

            FileFilterRangeEnum fileFilterRangeEnum = FileFilterRangeEnum.getEnumByValue(range);
            if (fileFilterRangeEnum == null) {
                continue;
            }

            // 要过滤的原内容
            String content = fileName;
            switch (fileFilterRangeEnum) {
                case FILE_NAME:
                    content = fileName;
                    break;
                case FILE_CONTENT:
                    content = fileContent;
                    break;
                default:
            }

            FileFilterRuleEnum filterRuleEnum = FileFilterRuleEnum.getEnumByValue(rule);
            if (filterRuleEnum == null) {
                continue;
            }
            switch (filterRuleEnum) {
                case CONTAINS:
                    result = content.contains(value);
                    break;
                case STARTS_WITH:
                    result = content.startsWith(value);
                    break;
                case ENDS_WITH:
                    result = content.endsWith(value);
                    break;
                case REGEX:
                    result = content.matches(value);
                    break;
                case EQUALS:
                    result = content.equals(value);
                    break;
                default:
            }

            // 有一个不满足，就直接返回
            if (!result) {
                return false;
            }
        }

        // 都满足
        return true;
    }

    /**
     * 进行多个文件的筛选
     * @param filePath
     * @param fileFilterConfigList
     * @return
     */
    public static List<File> doFilter1(String filePath, List<FileFilterConfig> fileFilterConfigList){
        //loopFiles会把所有文件都拿出来，包括目录中的（不会把目录也拿出来）
        ArrayList<File> fileList = new ArrayList<>();
        for (File file : FileUtil.loopFiles(filePath)) {
            if (doSingleFileFilter(fileFilterConfigList, file)) {
                fileList.add(file);
            }
        }
        return fileList;
    }

    public static List<File> doFilter(String filePath, List<FileFilterConfig> fileFilterConfigList){
        System.out.println("=== 扫描目录:" + filePath);
        File root = new File(filePath);
        System.out.println("root是否存在:" + root.exists());
        System.out.println("root是不是目录:" + root.isDirectory());

        List<File> fileList = FileUtil.loopFiles(filePath);
        System.out.println("loopFiles拿到原始文件总数："+fileList.size());

        List<File> collect = fileList.stream()
                .filter(file -> doSingleFileFilter(fileFilterConfigList, file))
                .collect(Collectors.toList());
        System.out.println("过滤后剩余文件数："+collect.size());
        return collect;
    }


}
