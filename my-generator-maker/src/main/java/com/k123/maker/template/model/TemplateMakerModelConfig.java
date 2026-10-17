package com.k123.maker.template.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
public class TemplateMakerModelConfig {

    //关于模型过滤的内容
    private List<ModelInfoConfig> models;

    @NoArgsConstructor
    @Data
    public static class ModelInfoConfig {
        private String fieldName;
        private String type;
        private String description;
        private Object defaultValue;
        private String abbr;
        private String replaceText;
    }

    //关于模型分组的内容（分组时需要当前组别的Name、Key、控制组的开关condition）
    private ModelGroupConfig modelGroupConfig;

    @NoArgsConstructor
    @Data
    public static class ModelGroupConfig {

        private String groupName;

        private String groupKey;

        private String condition;
    }
}
