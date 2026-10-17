package com.k123.maker.template.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
public class TemplateMakerFileConfig {

    //关于文件过滤的内容（过滤时需要过滤的文件路径、过滤的条件）
    private List<FileInfoConfig> files;

    @NoArgsConstructor
    @Data
    public static class FileInfoConfig {

        private String path;

        private List<FileFilterConfig> filterConfigList;
    }

    //关于文件分组的内容（分组时需要当前组别的Name、Key、控制组的开关condition）
    private FileGroupConfig fileGroupConfig;

    @NoArgsConstructor
    @Data
    public static class FileGroupConfig {

        private String groupName;

        private String groupKey;

        private String condition;
    }
}
